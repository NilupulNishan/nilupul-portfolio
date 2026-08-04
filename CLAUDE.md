# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start dev server with local API routes
npm run build     # Production build
npm run preview   # Preview production build locally
npm run lint      # Run ESLint
```

## Environment Setup

Copy `.env.example` to `.env` and fill in the values before running locally:

- `GITHUB_TOKEN`  - GitHub personal access token with `read:user` scope (for the contribution calendar)
- `VITE_GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_ID`  - the same Google OAuth Web client ID under two names; only `VITE_`-prefixed vars reach the browser, and the server needs the bare name for the `aud` check
- `UPSTASH_REDIS_REST_URL` / `UPSTASH_REDIS_REST_TOKEN`  - Upstash Redis REST credentials (`KV_REST_API_URL` / `KV_REST_API_TOKEN` also work, for stores provisioned through the Vercel Marketplace)
- `RESEND_API_KEY` / `TESTIMONIAL_NOTIFY_EMAIL`  - new-testimonial notification email; `TESTIMONIAL_FROM_EMAIL` is optional
- `TESTIMONIAL_DELETE_SECRET`  - long random string; signs the one-click delete link
- `SITE_URL`  - optional; origin used to build the delete link when request headers are not enough

Every credential degrades gracefully when missing  - the UI shows a fallback state rather than breaking. Never prefix the Upstash token, Resend key or delete secret with `VITE_`; that would bundle them into the public JS.

## Architecture

This is a multi-page React portfolio deployed to Vercel, using **react-router-dom** (data router via `createBrowserRouter`).

**Routing**  - `src/router.jsx` defines the routes; `src/main.jsx` renders `<RouterProvider>`. A shared `src/layout/Layout.jsx` (header/nav, footer, scroll progress, back-to-top, `<ScrollRestoration/>`, Analytics) wraps every page via `<Outlet/>`. Pages live in `src/pages/`: `Home` (the long scroll), `Projects` (brands/content series - formerly `Channels`, with a `/channels` -> `/projects` redirect in `vercel.json`), `Afterlife` (philanthropy/legacy), `Lab` (experimental), `Contact`, `NotFound`. Section components and shared motion primitives live in `src/sections.jsx`. `vercel.json` rewrites all non-`/api/*` paths to `/index.html` for SPA deep links.

**Nav**  - `navItems` (`src/data/portfolio.js`) tags each link `type: 'route'` (react-router `NavLink`) or `type: 'anchor'` (a `/#section` link on Home). The `Navbar` (in `sections.jsx`) intercepts anchor clicks: scrolls on Home, or navigates to `/` with `state.scrollTo` from another page (handled by an effect in `Home.jsx`). The on-scroll active-section tracker runs only on Home.

Nav is deliberately split: the first three items (`Home`, `About`, `Experience`) are Home anchors, and everything after them (`Projects`, `Afterlife`, `Lab`, `Contact`) is a route. Keeping all anchors ahead of all routes stops the scroll highlight from jumping over a dead gap in the middle of the bar. Because those route pages are absent from the Home scroll entirely, `ExploreMore` (a card row near the end of Home) exists purely to make them discoverable without the navbar; `ContactCta` is the slim band that closes Home and links to `/contact`.

`Contact` stays in `navItems` as the single contact affordance. The `nav-actions` button beside it is **not** a second `/contact` link  - it reads `What they said` and jumps to the `#testimonials` section on Home. Because testimonials is a Home section rather than a route, that button calls `goToSection('testimonials')` like the anchor nav items instead of using a `NavLink`; from another page that navigates to `/` with `state.scrollTo`, which `Home.jsx` handles.

**Data layer**  - Static content lives in `src/data/`:
- `portfolio.js`  - nav items, social links, tech categories, projects, `afterlifeItems`, `labItems`. Main file to edit when updating content.
- `certifications.json`  - certification cards array
- `projects.json` and `skills.json` exist but are not currently imported (content is in `portfolio.js`)

**API routes**  - `api/*.js` files are Vercel serverless functions. Vite's `localApiRoutes` plugin in `vite.config.js` serves them at `/api/*` during local development, mirroring the Vercel deployment; new routes must be registered in its hardcoded `routes` map. `api/github-contributions.js` implements in-process caching with a 3-hour TTL. Real Vercel pre-parses `request.body` for POSTs and the plugin does not, so the plugin parses JSON bodies itself  - without that, a handler reading `request.body` works in production and gets `undefined` locally.

**Testimonials**  - Visitors sign in with Google and `POST /api/testimonials`. The browser uses Google's **OAuth token flow** (`google.accounts.oauth2.initTokenClient`) behind our own button, **not** the rendered `renderButton` widget. That widget is a cross-origin iframe: it cannot be styled, and with an active Google session it silently swaps in a "personalised" variant that prints the visitor's email on the page. Our own button avoids both.

Because that flow yields an **access token rather than an ID token**, verification differs in a way that matters. An ID token is a JWT signed for us, so tampering breaks the signature; an access token is an opaque bearer string carrying no audience of its own. So `api/testimonials.js` calls `tokeninfo?access_token=` and checks **`aud` === our client ID** - that check *is* the security boundary. Without it, a token minted for any other Google app with the same scopes would be accepted here. A second call to `oauth2/v3/userinfo` supplies the display name and photo only; `sub` and `email` always come from the verified `tokeninfo` response, never from `userinfo` or the request body. Entries publish **instantly** to an Upstash Redis list; `GET /api/testimonials` **strips `email` and `sub` from every entry**, which are stored only for dedupe and notification. One entry per Google account: a resubmission replaces the previous one.

Moderation is after the fact: each submission emails a plain-text notification containing an HMAC-signed link to `api/testimonial-delete.js`. That route's `GET` renders a confirmation page and only its `POST` deletes, because email clients and link scanners prefetch URLs. There is no admin UI by design.

`api/_store.js` is the swappable storage seam  - it is the only file that knows Upstash is behind the data. `api/_signing.js` holds the HMAC sign/verify pair.

**Animation system**  - All motion uses Framer Motion. The `useLeanMotion()` hook detects mobile/touch devices (`max-width: 720px` or `pointer: coarse`) and switches to lighter animation variants throughout. Shared motion primitives (`Reveal`, `StaggerContainer`, `MotionCard`) are defined in `src/sections.jsx` and exported for use across pages. All animations respect `useReducedMotion()`.

**Styling**  - Tailwind CSS v4 (via `@tailwindcss/vite`) for utility classes. All global styles, the design tokens, and the light/dark theme live in `src/index.css`. The accent color is centralized in the `--accent` token (`:root` + `[data-theme="dark"]`); the toggle writes `document.documentElement.dataset.theme`.

**Pagination**  - Case studies (the `CaseStudies` section on Home, backed by the `projects` array) use desktop pagination (3 per page) and mobile show-more (2 per batch). Certifications use responsive page sizes (3/4/6 depending on breakpoint) and mobile show-more (3 per batch). Both are driven by `SectionPagination` in `src/sections.jsx`.

**Deployment**  - Vercel. `public/sitemap.xml` and `public/robots.txt` are static. Analytics via `@vercel/analytics`.
