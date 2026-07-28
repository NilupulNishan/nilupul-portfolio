# Testimonials with Google Sign-In + nav cleanup

## Context

Two things prompted this.

**1. A duplicate CTA.** Moving Contact to its own page left the navbar with a `Contact` text
link *and* a `Get in touch` button pointing at the same `/contact` URL.

**2. Social proof.** Nilupul wants a section where people leave a recommendation about him,
displayed with their name, plus a way to submit one.

His original idea was to repurpose the top-right button into "What they said". We decided
**not** to — that slot is the site's highest-value real estate and should hold the conversion
action. Testimonials are evidence supporting that ask, not the ask. The duplication is fixed
by dropping the redundant `Contact` text link and keeping the button.

**Identity + publishing decisions.** Entries are authenticated with **Sign in with Google**
and go **live instantly** — no pre-approval queue. Nilupul gets a notification containing a
**signed one-click delete link**, so removal takes a phone tap and needs no admin UI or login
system.

Two things were established while deciding this, and the design depends on both:

- Google verifies *that a real Google account signed in*. It does **not** verify that the
  display name is that person's real name — consumer Gmail display names are self-chosen, and
  a new account takes two minutes. Google buys strong bot resistance and accountability, not
  name authenticity.
- Instant publish is **incompatible with static JSON**. The originally-planned
  `testimonials.json` design worked only because the git commit *was* the publish step. Going
  live on submit requires a real datastore.

Accepted residual risk, chosen knowingly: **content posted while he is asleep is live on his
professional portfolio until he sees the notification.** The delete link shrinks that window
to his response time; it does not eliminate it.

---

## Approach

### A. Nav cleanup (independent of the rest — can land first)

- `src/data/portfolio.js` — remove the `Contact` entry from `navItems`. The `/contact` route,
  page and `ContactCta` band all stay; only the nav *link* goes.
- `src/sections.jsx` `Footer()` (~line 1880) renders `navItems.map(...)`, so Contact would
  vanish from the footer too. Append an explicit `<a href="/contact">Contact</a>` after the map.
- The `Get in touch` NavLink in `nav-actions` is unchanged.

Result: `Home · About · Experience · Projects · Afterlife · Lab` + `[Get in touch]`, preserving
the anchors-before-routes rule documented in CLAUDE.md.

### B. Storage — Upstash Redis

**Vercel KV no longer exists.** It was sunset and existing stores were auto-migrated to Upstash
Redis in December 2024; `@vercel/kv` is deprecated. Use **`@upstash/redis`** — the one new
runtime dependency this feature needs.

**Total cost of this feature: $0.** Upstash free tier (verified July 2026) is **256 MB / 500,000
commands per month / no credit card / up to 10 databases**. The section costs roughly one read
per page view, so the ceiling is in the tens of thousands of monthly page views — far beyond a
personal portfolio. Resend's free tier covers the notification emails; Google Sign-In is free.

Two provisioning paths:

- **Direct at upstash.com** (recommended) — no credit card. Copy the two REST credentials into
  `.env` and into Vercel's project env settings by hand. Fewest steps.
- **Via Vercel Marketplace** ("Upstash for Redis") — auto-injects the credentials as env vars,
  but routes through Vercel's unified billing setup.

Alternatives considered and rejected:

- **Supabase** — free tier bundles Postgres *and* Google OAuth (50k MAU), which would absorb
  the token-verification work. Rejected because **free projects pause after 7 days of
  inactivity**; a personal portfolio can easily go a week without a visitor, and the
  testimonials section would break until manually resumed.
- **GitHub as store** (commit entries to a JSON file via the already-configured `GITHUB_TOKEN`)
  — free forever, but publish latency becomes a 30-60s redeploy and every submission burns a
  deploy.

**Env var naming is inconsistent between the two paths** — direct Upstash gives
`UPSTASH_REDIS_REST_URL` / `UPSTASH_REDIS_REST_TOKEN`, while the Vercel integration has
historically injected `KV_REST_API_URL` / `KV_REST_API_TOKEN` for backwards compatibility.
Have `api/_store.js` accept either pair so the choice above doesn't change any other file.

Isolate all of this in **`api/_store.js`** so the provider is swappable in one file.

A Redis **list** (`LPUSH` / `LRANGE`), not a single JSON blob under one key — the list
operations are atomic and avoid a lost-update race between concurrent submissions.

Stored entry:

```js
{ id, sub, name, email, picture, role, quote, createdAt }
```

- `sub` — stable Google user ID, used to enforce one testimonial per account
- `email`, `sub` — **stored but never served to the browser** (see D)

### C. Google Sign-In

Console setup (free, no billing account): new Google Cloud project → OAuth consent screen →
OAuth 2.0 Client ID (Web application) → authorized JS origins `http://localhost:5173` and
`https://www.nilupulnishan.me`. Only non-sensitive scopes (`openid`, `email`, `profile`), which
do not require Google's app-verification review.

Frontend loads `https://accounts.google.com/gsi/client`, calls
`google.accounts.id.initialize({ client_id, callback })` + `renderButton`. **Reuse the existing
script-injection idiom** in `sections.jsx` (~line 1607, the TikTok embed loader) rather than
inventing a second one.

**Server-side verification is mandatory.** A client-decoded JWT is just a string the user could
have typed. Verify by calling `https://oauth2.googleapis.com/tokeninfo?id_token=<jwt>` and
checking `aud` === our client ID, `iss` is Google, `exp` in the future, `email_verified` true.
This offloads signature checking to Google and avoids both a JWKS cache implementation and the
`google-auth-library` dependency — one extra network hop per submission, irrelevant at this
volume.

### D. API routes

Use `api/testimonials.js` and `api/testimonial-delete.js` — deliberately **not**
`api/testimonials/delete.js`, which would put a file and a directory of the same name at the
same level.

Mirror the conventions in `api/github-contributions.js`: default-exported
`handler(request, response)`, its `sendJson` helper shape, 405 + `Allow` on wrong method
(`github-contributions.js:220`), and its missing-credential 503 degradation
(`github-contributions.js:226-236`). Do **not** copy its `Cache-Control: s-maxage=10800` onto
writes.

**`GET /api/testimonials`** — returns the public list. **Must strip `email` and `sub` from
every entry.** Serving those to the browser would leak personal data of everyone who ever
submitted; this is the single most important line in the route.

**`POST /api/testimonials`** — verify the Google token → validate `quote` (10–1000 chars,
trimmed) and `role` (≤120) server-side → reject/replace if `sub` already has an entry → push to
Redis → send the notification email. Identity fields come from the *verified token*, never from
the request body.

**`/api/testimonial-delete`** — HMAC-SHA256 of the entry id using `TESTIMONIAL_DELETE_SECRET`
(Node `crypto`, compared with `timingSafeEqual`).

> **`GET` must not delete.** Email clients and link scanners prefetch URLs, and a prefetch
> would silently wipe testimonials. So: `GET` renders a tiny confirmation page with a button;
> the `POST` from that button performs the delete. One extra tap, and it makes the feature
> safe to put in an email.

Notification email via **Resend** using plain `fetch` (no SDK dependency), sent as **plain
text, not HTML**, so submitted content cannot inject markup. Include the quote, the name, the
email, and the signed delete URL.

Rate limiting now has a real datastore behind it — use a Redis `INCR` + `EXPIRE` counter keyed by
IP, rather than the in-memory counter that would reset on every cold start.

### E. Frontend section

New `Testimonials` component in `src/sections.jsx`, exported from the bottom `export {}` block,
rendered in `src/pages/Home.jsx` near `ExploreMore`.

Reuse existing primitives — `SectionHeader` (`sections.jsx:327`), `StaggerContainer`,
`MotionCard`, `.content-card`, `Reveal`.

**Reuse the existing `.contact-form` stylesheet** (`src/index.css:2816-2960`). It is fully
built — labels, focus rings, `.field-error`, `:disabled`, placeholder colors, `.full` spanning,
plus responsive rules at lines 3581 / 3731 / 3856 / 3905 — and **nothing currently uses it**.
Only genuinely new CSS: a `.testimonial-card` quote/attribution treatment, an avatar circle,
and a grid class wired into the same two breakpoints `.explore-grid` uses (3 → 2 at ≤1100px →
1 at ≤720px).

Because this now fetches at runtime it needs **loading, error, and empty states** — follow the
degradation pattern `GitHubActivity` already uses for a missing credential.

**Avatar fallback is required, not optional.** Google avatar URLs
(`lh3.googleusercontent.com/…`) are not stable and 404 when a user changes their photo. Give
the `<img>` an `onError` handler that swaps to an initials circle.

Graceful degradation: if `VITE_GOOGLE_CLIENT_ID` is unset, render the list but hide the
sign-in/submit block rather than showing a broken button.

### F. Environment

Add to `.env.example` (`.env` is already gitignored):

```
VITE_GOOGLE_CLIENT_ID=       # public by design, reaches the browser
GOOGLE_CLIENT_ID=            # server-side aud check (same value)
UPSTASH_REDIS_REST_URL=      # or KV_REST_API_URL via Vercel Marketplace
UPSTASH_REDIS_REST_TOKEN=    # or KV_REST_API_TOKEN
RESEND_API_KEY=
TESTIMONIAL_NOTIFY_EMAIL=
TESTIMONIAL_DELETE_SECRET=   # long random string
```

Only `VITE_`-prefixed vars reach the browser — that is why the Google client ID is duplicated
under two names. Never prefix the Upstash token, Resend key or delete secret with `VITE_`;
doing so would bundle them into the public JS.

`vite.config.js` already copies `.env` into `process.env` (lines 41-45), so the server-side
vars work under `npm run dev` without the Vercel CLI.

### G. Local dev wiring (the gotcha)

`vite.config.js` `localApiRoutes()` needs two changes:

1. Register `/api/testimonials` and `/api/testimonial-delete` in the hardcoded `routes` map
   (lines 8-10).
2. **Add body parsing.** The plugin passes the raw Node request straight through
   (`await route.default(request, response)`, line 26). Real Vercel pre-parses `request.body`
   for POSTs; this plugin does not. Without the fix, handlers reading `request.body` work in
   production and get `undefined` locally. The existing GitHub route never exposed this because
   it is GET-only. Collect the stream, `JSON.parse`, assign to `request.body` before dispatch —
   guarded so a malformed body yields 400, not 500.

Confirmed: `npm run dev` is plain `vite` and there is no `vercel` CLI in `package.json`. This
project does not use `vercel dev`; extending the plugin is the correct fix.

### H. Docs

`CLAUDE.md` — document the testimonials flow (Google Sign-In → verified POST → Upstash Redis →
instant publish → signed delete link), note `api/_store.js` as the swappable storage seam, and
add the new env vars to Environment Setup.

---

## Verification

1. `npm run lint` — expect only the pre-existing `PlatformEmbed.jsx` warning. Note:
   `eslint-plugin-react` is **not** installed, so ESLint cannot see JSX usage — a component
   referenced only in JSX must be a capitalized `const` (matching `varsIgnorePattern: '^[A-Z_]'`),
   never a destructured function param, or it warns.
2. `npm run build` — must pass.
3. `npm run dev`, with **no** env vars set: section renders, sign-in block hidden, nothing
   crashes. This proves the degradation path.
4. With env vars set:
   - Sign in with Google → submit → entry appears without a reload.
   - `GET /api/testimonials` in devtools → confirm **no `email` and no `sub`** in the payload.
     Check this explicitly; it is the privacy-critical assertion.
   - Submit a second time from the same account → deduped, not duplicated.
   - Check the notification email arrives as plain text with a working delete URL.
   - Open the delete URL → confirmation page, not an immediate delete. Confirm → entry gone.
   - Tamper with the token in the delete URL → rejected.
   - `POST` with a forged/expired Google token → rejected server-side.
   - Point an entry's `picture` at a 404 URL → initials fallback renders.
5. Responsive check at 1100px and 720px for the new grid.
6. Deploy preview: re-run the submit and delete flows on real Vercel — this is where
   `request.body` differs from local, so both paths must be exercised.

## Out of scope

- No admin dashboard — deletion is the signed email link by design.
- Case-study card copy rewrite remains pending separately (Nilupul owes real
  problem/decision/outcome detail; do not invent it).
- Worth revisiting later: real LinkedIn recommendations are third-party-attributed and more
  credible than anything a form on his own domain can produce.
