import { isStoreConfigured, removeTestimonialById } from './_store.js';
import { isSigningConfigured, verifyId } from './_signing.js';

// Named `testimonial-delete` rather than `testimonials/delete` so a file and a
// directory of the same name never sit at the same level in api/.

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function sendHtml(response, statusCode, title, message, formAction) {
  response.statusCode = statusCode;
  response.setHeader('Content-Type', 'text/html; charset=utf-8');
  response.setHeader('Cache-Control', 'no-store');
  response.end(`<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex">
<title>${escapeHtml(title)}</title>
<style>
  body { margin: 0; display: grid; place-items: center; min-height: 100vh;
         background: #0b0c0d; color: #f4f5f6;
         font: 16px/1.55 -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; }
  main { max-width: 30rem; padding: 2rem; text-align: center; }
  h1 { font-size: 1.25rem; margin: 0 0 .75rem; }
  p { color: rgba(255,255,255,.7); margin: 0 0 1.5rem; }
  button { border: 0; border-radius: 2px; background: #ff7d1f; color: #0b0c0d;
           padding: .8rem 1.6rem; font: inherit; font-weight: 600; cursor: pointer; }
  button:hover { background: #ff9245; }
  a { color: #ff9245; }
</style>
</head>
<body>
<main>
<h1>${escapeHtml(title)}</h1>
<p>${escapeHtml(message)}</p>
${formAction ? `<form method="post" action="${escapeHtml(formAction)}"><button type="submit">Delete this testimonial</button></form>` : '<p><a href="/">Back to the site</a></p>'}
</main>
</body>
</html>`);
}

export default async function handler(request, response) {
  if (request.method !== 'GET' && request.method !== 'POST') {
    response.setHeader('Allow', 'GET, POST');
    sendHtml(response, 405, 'Method not allowed', 'This link only supports GET and POST.');
    return;
  }

  if (!isStoreConfigured() || !isSigningConfigured()) {
    sendHtml(response, 503, 'Not configured', 'Testimonial storage or the delete secret is not configured on this deployment.');
    return;
  }

  // Both methods read from the query string, so the POST needs no body parsing -
  // which keeps this route identical locally and on Vercel.
  const url = new URL(request.url, 'http://localhost');
  const id = url.searchParams.get('id') || '';
  const token = url.searchParams.get('token') || '';

  if (!verifyId(id, token)) {
    sendHtml(response, 403, 'Invalid link', 'This delete link is not valid. It may have been altered or the signing secret has changed.');
    return;
  }

  // GET must never delete. Email clients and link scanners prefetch URLs, and a
  // prefetch would silently wipe a testimonial - so GET only renders the button.
  if (request.method === 'GET') {
    const action = `/api/testimonial-delete?id=${encodeURIComponent(id)}&token=${encodeURIComponent(token)}`;
    sendHtml(response, 200, 'Delete this testimonial?', 'This removes the entry from your portfolio immediately. It cannot be undone.', action);
    return;
  }

  try {
    const removed = await removeTestimonialById(id);
    if (!removed) {
      sendHtml(response, 404, 'Already gone', 'That testimonial no longer exists - it may have been deleted already.');
      return;
    }
    sendHtml(response, 200, 'Deleted', `The testimonial from ${removed.name} has been removed from your portfolio.`);
  } catch (error) {
    sendHtml(response, 502, 'Delete failed', error.message || 'Unable to reach the datastore.');
  }
}
