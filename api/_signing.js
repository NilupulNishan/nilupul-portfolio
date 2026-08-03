/* global process, Buffer */

import crypto from 'node:crypto';

// The delete link ships inside a notification email, so its only protection is
// this signature - there is no login behind it. Keep the secret out of VITE_*.
export function isSigningConfigured() {
  return Boolean(process.env.TESTIMONIAL_DELETE_SECRET);
}

export function signId(id) {
  const secret = process.env.TESTIMONIAL_DELETE_SECRET;
  if (!secret) {
    throw new Error('TESTIMONIAL_DELETE_SECRET is not configured.');
  }
  return crypto.createHmac('sha256', secret).update(String(id)).digest('hex');
}

export function verifyId(id, token) {
  if (!id || !token) {
    return false;
  }

  let expected;
  try {
    expected = signId(id);
  } catch {
    return false;
  }

  const provided = Buffer.from(String(token), 'utf8');
  const expectedBuffer = Buffer.from(expected, 'utf8');

  // timingSafeEqual throws on length mismatch, so guard before comparing.
  if (provided.length !== expectedBuffer.length) {
    return false;
  }

  return crypto.timingSafeEqual(provided, expectedBuffer);
}
