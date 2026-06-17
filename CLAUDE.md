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

- `GITHUB_TOKEN` — GitHub personal access token with `read:user` scope (for the contribution calendar)
- `SPOTIFY_CLIENT_ID` / `SPOTIFY_CLIENT_SECRET` — Spotify app credentials (for playlist follower count)

Both APIs degrade gracefully when credentials are missing — the UI shows fallback states rather than breaking.

## Architecture

This is a single-page React portfolio deployed to Vercel. The app is one large `App.jsx` that renders all page sections sequentially; there is no router.

**Data layer** — Static content lives in `src/data/`:
- `portfolio.js` — nav items, social links, tech categories, projects list, TikTok stats. This is the main file to edit when updating portfolio content.
- `certifications.json` — certification cards array
- `projects.json` and `skills.json` exist but are not currently imported (content is in `portfolio.js`)

**API routes** — `api/github-contributions.js` and `api/spotify-playlist.js` are Vercel serverless functions. Vite's `localApiRoutes` plugin in `vite.config.js` serves them at `/api/*` during local development, mirroring the Vercel deployment. Both implement in-process caching with a 3-hour TTL.

**Animation system** — All motion uses Framer Motion. The `useLeanMotion()` hook detects mobile/touch devices (`max-width: 720px` or `pointer: coarse`) and switches to lighter animation variants throughout. Shared motion primitives (`Reveal`, `StaggerContainer`, `MotionCard`) are defined in `App.jsx` and used across all sections. All animations respect `useReducedMotion()`.

**Styling** — Tailwind CSS v4 (via `@tailwindcss/vite`) for utility classes, plus CSS Modules per component in the `src/components/` directory. Global tokens and base styles are in `src/index.css`; `src/vars.css` contains legacy CSS custom properties from an older theme (not actively used by the main design).

**Pagination** — Projects use desktop pagination (3 per page) and mobile show-more (2 per batch). Certifications use responsive page sizes (3/4/6 depending on breakpoint) and mobile show-more (3 per batch). Both are driven by `SectionPagination` in `App.jsx`.

**Deployment** — Vercel. `public/sitemap.xml` and `public/robots.txt` are static. Analytics via `@vercel/analytics`.
