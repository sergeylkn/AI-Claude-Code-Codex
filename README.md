# Local-First AI Learning Platform (Phase 1)

This repository is now aligned to **Phase 1 only** from your roadmap:
- Next.js setup
- Tailwind setup
- Browser UI foundation with **sidebar + main view**

No paid API is required for Phase 1.

## What is ready in Phase 1
- Next.js App Router + TypeScript project base.
- Tailwind CSS connected and global utility styles.
- Reusable app shell layout (`Sidebar` + `Main Content`).
- Responsive UI that works directly in browser.

## Run locally (easy)
```bash
npm install
npm run dev
```
Open: `http://localhost:3000`

## Docker run (optional)
```bash
docker compose up --build
```
Open: `http://localhost:3000`

## Implemented files for Phase 1
- `app/page.tsx`
- `components/layout/sidebar.tsx`
- `components/layout/app-shell.tsx`
- `app/globals.css`
- `tailwind.config.ts`
- `postcss.config.js`

## Next (not included in this phase)
- Phase 2: local course system from `/data/courses.json`
- Phase 3+: Ollama client, orchestrator, memory, RAG, chat, code review, project generator
