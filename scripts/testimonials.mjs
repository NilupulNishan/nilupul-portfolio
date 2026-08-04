// Lists every live testimonial with a freshly signed delete link.
//
// Moderation normally happens through the link in the notification email. This is
// the recovery path for when that email is lost, filed into spam, or deleted -
// there is no admin UI by design, so without this the only way back in would be
// hand-assembling an HMAC.
//
//   npm run testimonials              # links point at production
//   npm run testimonials -- --local   # links point at the dev server

import { loadEnv } from 'vite';

const env = loadEnv('development', process.cwd(), '');
for (const [key, value] of Object.entries(env)) {
  if (!process.env[key]) {
    process.env[key] = value;
  }
}

const { isStoreConfigured, listTestimonials } = await import('../api/_store.js');
const { isSigningConfigured, signId } = await import('../api/_signing.js');

if (!isStoreConfigured()) {
  console.error('UPSTASH_REDIS_REST_URL / UPSTASH_REDIS_REST_TOKEN are not set in .env');
  process.exit(1);
}

if (!isSigningConfigured()) {
  console.error('TESTIMONIAL_DELETE_SECRET is not set in .env - delete links cannot be signed.');
  process.exit(1);
}

const useLocal = process.argv.includes('--local');
const origin = useLocal
  ? 'http://localhost:5173'
  : (process.env.SITE_URL || 'https://nilupulnishan.vercel.app').replace(/\/+$/, '');

const entries = await listTestimonials();

if (entries.length === 0) {
  console.log('No testimonials are currently live.');
  process.exit(0);
}

console.log(`${entries.length} testimonial${entries.length === 1 ? '' : 's'} live at ${origin}\n`);

for (const entry of entries) {
  const when = new Date(entry.createdAt).toLocaleString();
  console.log(`${entry.name}${entry.role ? ` - ${entry.role}` : ''}`);
  console.log(`  ${entry.email}   ${when}`);
  console.log(`  "${entry.quote.replace(/\s+/g, ' ')}"`);
  console.log(`  delete: ${origin}/api/testimonial-delete?id=${encodeURIComponent(entry.id)}&token=${signId(entry.id)}`);
  console.log('');
}

console.log('Opening a delete link shows a confirmation page - it does not delete on its own.');
