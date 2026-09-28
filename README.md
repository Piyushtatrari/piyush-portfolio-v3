# Piyush Tatrari · Portfolio

Personal portfolio of a full stack engineer (React, Next.js, TypeScript, Node, FastAPI).

**Stack:** Next.js 16 (App Router, static export) · React 19 · TypeScript · hand-written CSS · inline animated SVG · Phosphor icons

- Server components by default; client components only where there is interaction (`components/Header.tsx`, `WorkBento.tsx`, `HeroArt.tsx`, `motion.tsx`, `widgets.tsx`).
- All copy lives in `lib/data.ts`.
- Dark and light themes with a View Transition switch, scroll reveals on one shared `IntersectionObserver`, and full `prefers-reduced-motion` support.

## Run

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # static site in ./out
```

## Deploy

Netlify reads `netlify.toml` (build `npm run build`, publish `out`). Any static host that serves `./out` works.
