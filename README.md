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

## Updating from the resume

Experience, education and project blurbs come from `content/resume.json`, which is generated from the resume PDF. Don't edit them in `lib/data.ts`.

```bash
python -m venv resume-sync/.venv && resume-sync/.venv/Scripts/pip install -r resume-sync/requirements.txt   # once
resume-sync/.venv/Scripts/streamlit run resume-sync/app.py      # upload a PDF, preview, Publish
resume-sync/.venv/Scripts/python resume-sync/sync.py resume.pdf # same, no UI
```

Publish replaces `public/Piyush_Tatrari_Resume.pdf` and `content/resume.json`, commits, and pushes; the host rebuilds on push. If `../Resume/publish_resume.py` exists, the PDF is also filed as a dated resume version (and copied to Google Drive). The parser reads the one-column template's font cues (11pt bold headings, italic dates, bullets), so other resume layouts need a parser change.
