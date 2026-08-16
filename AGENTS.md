<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Project: R4NiTeXe Portfolio

## Tech stack
Next.js 16 (App Router, static generation) · TypeScript · Tailwind CSS v4 (CSS-first tokens in `app/globals.css`) · Framer Motion · React Three Fiber · mongoose · resend · Vercel.

## Design system
Three-layer tokens (primitive → semantic → component) live in `app/globals.css`. Never hardcode hex colors in components — use semantic Tailwind classes: `bg-bg`, `bg-surface`, `bg-elevated`, `border-border`, `text-text`, `text-text-muted`, `text-accent`, `text-accent-violet`.

## Single source of truth
All portfolio content lives in `lib/data/` (`site.ts`, `profile.ts`, `projects.ts`, `skills.ts`, `journey.ts`). These modules drive the website, resume, Recruiter Mode, Terminal, Developer Mode, and JSON-LD. Never duplicate portfolio information in components. Only real information goes here — no invented projects, stats, or credentials.

## Honesty rules
- Only two real projects: Video-Tube and Dukaan Sathi (with collaborator Pritam Maji credit).
- Skills must be genuinely used in the projects; no fake percentage bars.

## Git commit messages (required)
Use Conventional Commits: `<type>: <clear description>` with lowercase types.
Allowed types: `feat` · `fix` · `refactor` · `perf` · `test` · `docs` · `style` · `chore` · `ci` · `build`.
- Short, human-readable messages describing what actually changed.
- Never vague messages ("update code", "minor changes", "work done").
- Never mention AI, generated code, or prompts.
- One commit per completed implementation/testing phase.

## Environment variables (server-only, never NEXT_PUBLIC_)
`MONGODB_URI` · `RESEND_API_KEY` · `ADMIN_PASSWORD` — used by the contact API and admin inbox. Never expose them in client code.