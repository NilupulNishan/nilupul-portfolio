/* global process */

import crypto from 'node:crypto';

import {
  addTestimonial,
  isRateLimited,
  isStoreConfigured,
  listTestimonials,
  removeTestimonialBySub,
} from './_store.js';
import { isSigningConfigured, signId } from './_signing.js';

const QUOTE_MIN_LENGTH = 10;
const QUOTE_MAX_LENGTH = 1000;
const ROLE_MAX_LENGTH = 120;
const NAME_MAX_LENGTH = 120;

const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_SECONDS = 3600;

// Entries publish instantly, so a cached GET would show a stale list right after
// someone submits. This is the one place the s-maxage used elsewhere in api/ is wrong.
function sendJson(response, statusCode, payload) {
  response.statusCode = statusCode;
  response.setHeader('Content-Type', 'application/json; charset=utf-8');
  response.setHeader('Cache-Control', 'no-store');
  response.end(JSON.stringify(payload));
}

// The single most important function in this file. `email` and `sub` are stored so
// duplicates can be detected and so the notification email is useful, but serving
// either to the browser would publish the personal data of everyone who submitted.
function toPublicEntry(entry) {
  return {
    id: entry.id,
    name: entry.name,
    role: entry.role || '',
    quote: entry.quote,
    picture: entry.picture || '',
    createdAt: entry.createdAt,
  };
}

function readBody(request) {
  const body = request.body;

  if (!body) {
    return {};
  }

  if (typeof body === 'string') {
    try {
      return JSON.parse(body);
    } catch {
      return null;
    }
  }

  return typeof body === 'object' ? body : null;
}

function clientIp(request) {
  const forwarded = request.headers['x-forwarded-for'];
  if (typeof forwarded === 'string' && forwarded.length > 0) {
    return forwarded.split(',')[0].trim();
  }
  return request.socket?.remoteAddress || 'unknown';
}

function siteOrigin(request) {
  if (process.env.SITE_URL) {
    return process.env.SITE_URL.replace(/\/+$/, '');
  }
  const proto = request.headers['x-forwarded-proto'] || 'http';
  const host = request.headers['x-forwarded-host'] || request.headers.host || 'localhost:5173';
  return `${proto}://${host}`;
}

// A client-decoded JWT is just a string the submitter could have typed by hand, so
// the token is checked server-side. Google's tokeninfo endpoint does the signature
// work, which saves both a JWKS cache and the google-auth-library dependency - one
// extra network hop per submission, irrelevant at this volume.
async function verifyGoogleToken(credential) {
  const clientId = process.env.GOOGLE_CLIENT_ID || process.env.VITE_GOOGLE_CLIENT_ID;

  if (!clientId || !credential || typeof credential !== 'string') {
    return null;
  }

  const endpoint = `https://oauth2.googleapis.com/tokeninfo?id_token=${encodeURIComponent(credential)}`;
  const response = await fetch(endpoint);

  if (!response.ok) {
    return null;
  }

  const info = await response.json().catch(() => null);

  if (!info || !info.sub) {
    return null;
  }

  if (info.aud !== clientId) {
    return null;
  }

  if (info.iss !== 'accounts.google.com' && info.iss !== 'https://accounts.google.com') {
    return null;
  }

  // tokeninfo returns these as strings.
  if (!(Number(info.exp) * 1000 > Date.now())) {
    return null;
  }

  if (info.email_verified !== 'true' && info.email_verified !== true) {
    return null;
  }

  return info;
}

// Plain text, not HTML: submitted content lands in this email verbatim, and plain
// text cannot carry markup into a mail client. Failure here must not fail the
// submission - the entry is already live either way.
async function sendNotification(entry, deleteUrl, isUpdate) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.TESTIMONIAL_NOTIFY_EMAIL;

  if (!apiKey || !to) {
    return;
  }

  const lines = [
    isUpdate
      ? `${entry.name} replaced their earlier testimonial. The new text is already live.`
      : `${entry.name} left a testimonial on your portfolio. It is already live.`,
    '',
    `Name:  ${entry.name}`,
    `Email: ${entry.email}`,
    `Role:  ${entry.role || '(none)'}`,
    '',
    'Quote:',
    entry.quote,
    '',
    deleteUrl ? `Remove it: ${deleteUrl}` : 'Delete link unavailable - TESTIMONIAL_DELETE_SECRET is not configured.',
  ];

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: process.env.TESTIMONIAL_FROM_EMAIL || 'onboarding@resend.dev',
      to: [to],
      // The timestamp keeps Gmail from collapsing a replacement into the same
      // conversation as the original, which makes a new email look like no email.
      subject: isUpdate
        ? `Updated testimonial from ${entry.name} (${entry.createdAt.slice(11, 16)} UTC)`
        : `New testimonial from ${entry.name}`,
      text: lines.join('\n'),
    }),
  });

  if (!response.ok) {
    const detail = await response.text().catch(() => '');
    throw new Error(`Resend rejected the notification (${response.status}): ${detail.slice(0, 200)}`);
  }
}

async function handleGet(response) {
  try {
    const entries = await listTestimonials();
    sendJson(response, 200, { testimonials: entries.map(toPublicEntry) });
  } catch (error) {
    sendJson(response, 502, {
      error: error.message || 'Unable to load testimonials.',
      testimonials: [],
    });
  }
}

async function handlePost(request, response) {
  const body = readBody(request);

  if (body === null) {
    sendJson(response, 400, { error: 'Request body must be JSON.' });
    return;
  }

  const ip = clientIp(request);

  try {
    if (await isRateLimited(`testimonial-rate:${ip}`, RATE_LIMIT_MAX, RATE_LIMIT_WINDOW_SECONDS)) {
      sendJson(response, 429, { error: 'Too many submissions. Try again later.' });
      return;
    }
  } catch {
    // A throttle failure is not a reason to reject a legitimate testimonial.
  }

  const identity = await verifyGoogleToken(body.credential);

  if (!identity) {
    sendJson(response, 401, { error: 'Google sign-in could not be verified.' });
    return;
  }

  const quote = String(body.quote || '').trim();
  const role = String(body.role || '').trim();

  if (quote.length < QUOTE_MIN_LENGTH) {
    sendJson(response, 400, { error: `Your recommendation should be at least ${QUOTE_MIN_LENGTH} characters.` });
    return;
  }

  if (quote.length > QUOTE_MAX_LENGTH) {
    sendJson(response, 400, { error: `Your recommendation should be under ${QUOTE_MAX_LENGTH} characters.` });
    return;
  }

  if (role.length > ROLE_MAX_LENGTH) {
    sendJson(response, 400, { error: `Role should be under ${ROLE_MAX_LENGTH} characters.` });
    return;
  }

  // One testimonial per Google account: a resubmission replaces the old one rather
  // than stacking up. Do the removal first so the replacement can inherit the id.
  let previous = null;
  try {
    previous = await removeTestimonialBySub(identity.sub);
  } catch (error) {
    sendJson(response, 502, { error: error.message || 'Unable to save your testimonial.' });
    return;
  }

  // Reusing the previous id is what keeps the delete link you were already emailed
  // working. Minting a fresh id here would silently orphan that link, leaving a live
  // testimonial whose only delete URL points at an entry that no longer exists.
  // Identity comes from the verified token, never from the request body - otherwise
  // anyone could sign in as themselves and post under someone else's name.
  const entry = {
    id: previous?.id || crypto.randomUUID(),
    sub: identity.sub,
    name: String(identity.name || identity.email || 'Anonymous').slice(0, NAME_MAX_LENGTH),
    email: identity.email || '',
    picture: identity.picture || '',
    role,
    quote,
    createdAt: new Date().toISOString(),
  };

  try {
    await addTestimonial(entry);
  } catch (error) {
    sendJson(response, 502, { error: error.message || 'Unable to save your testimonial.' });
    return;
  }

  try {
    const deleteUrl = isSigningConfigured()
      ? `${siteOrigin(request)}/api/testimonial-delete?id=${encodeURIComponent(entry.id)}&token=${signId(entry.id)}`
      : null;
    await sendNotification(entry, deleteUrl, Boolean(previous));
  } catch (error) {
    // Notification is best effort - the entry is already published, so a dead mail
    // provider must not fail the submission. But swallowing it silently made a
    // missing email indistinguishable from a delivered one, so it gets logged.
    console.error('Testimonial notification failed:', error.message);
  }

  sendJson(response, 201, { testimonial: toPublicEntry(entry) });
}

export default async function handler(request, response) {
  if (request.method !== 'GET' && request.method !== 'POST') {
    response.setHeader('Allow', 'GET, POST');
    sendJson(response, 405, { error: 'Method not allowed' });
    return;
  }

  if (!isStoreConfigured()) {
    sendJson(response, 503, {
      error: 'Testimonial storage is not configured.',
      testimonials: [],
    });
    return;
  }

  if (request.method === 'GET') {
    await handleGet(response);
    return;
  }

  await handlePost(request, response);
}
