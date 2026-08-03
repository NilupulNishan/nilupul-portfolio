/* global process */

// Upstash Redis over its REST API using plain fetch - no SDK, matching how the
// rest of api/ talks to third parties. This file is the only place that knows
// which provider is behind the data; swapping providers means rewriting it and
// nothing else.

const LIST_KEY = 'testimonials';

function credentials() {
  // Signing up at upstash.com directly gives UPSTASH_*; provisioning through the
  // Vercel Marketplace injects KV_* for backwards compatibility. Accept either
  // so the provisioning choice never leaks into another file.
  const url = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;

  if (!url || !token) {
    return null;
  }

  return { url: url.replace(/\/+$/, ''), token };
}

export function isStoreConfigured() {
  return credentials() !== null;
}

async function command(args) {
  const creds = credentials();
  if (!creds) {
    throw new Error('Redis credentials are not configured.');
  }

  const response = await fetch(creds.url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${creds.token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(args),
  });

  const payload = await response.json().catch(() => ({}));

  if (!response.ok || payload.error) {
    throw new Error(payload.error || `Redis command failed (${response.status}).`);
  }

  return payload.result;
}

function parseRow(row) {
  try {
    return JSON.parse(row);
  } catch {
    return null;
  }
}

export async function listTestimonials() {
  const rows = await command(['LRANGE', LIST_KEY, '0', '-1']);
  return (rows || []).map(parseRow).filter(Boolean);
}

// A Redis list rather than one JSON blob under a single key: LPUSH is atomic, so
// two people submitting at the same moment cannot overwrite each other.
export async function addTestimonial(entry) {
  await command(['LPUSH', LIST_KEY, JSON.stringify(entry)]);
  return entry;
}

// LREM matches on the exact serialized member, so re-serializing the parsed
// object would not match. Find the original raw string and remove that.
async function removeWhere(predicate) {
  const rows = (await command(['LRANGE', LIST_KEY, '0', '-1'])) || [];

  for (const row of rows) {
    const parsed = parseRow(row);
    if (parsed && predicate(parsed)) {
      // Report success only if LREM actually removed something. Returning the
      // parsed entry regardless would let the delete route tell you an entry was
      // deleted while it is still live on the site.
      const removed = await command(['LREM', LIST_KEY, '1', row]);
      return Number(removed) > 0 ? parsed : null;
    }
  }

  return null;
}

export function removeTestimonialById(id) {
  return removeWhere((entry) => entry.id === id);
}

export function removeTestimonialBySub(sub) {
  return removeWhere((entry) => entry.sub === sub);
}

// Best-effort throttle. Unlike an in-process counter this survives cold starts,
// but it is still only a speed bump - it is not a security control.
export async function isRateLimited(key, limit, windowSeconds) {
  const count = await command(['INCR', key]);

  if (count === 1) {
    await command(['EXPIRE', key, String(windowSeconds)]);
  }

  return count > limit;
}
