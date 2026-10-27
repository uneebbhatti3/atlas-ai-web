# Atlas AI Web

The web frontend for **Atlas AI**, a knowledge and research workspace built as a personal
engineering lab. Users organize knowledge as **Workspace → Project → Documents**, and later
search it semantically and ask questions answered with citations.

The backend lives in a separate repository, `atlas-ai-api` (NestJS, Better Auth, PostgreSQL).

> This is a learning project, not a commercial product. The backend is written entirely by hand;
> AI assistance is used for frontend UI only. See [`docs/LabRules.md`](docs/LabRules.md).

## Tech stack

Next.js (App Router) · TypeScript (strict) · Tailwind CSS · shadcn/ui · Lucide · Axios ·
TanStack Query · Zustand · Framer Motion · ESLint · Prettier · Husky · npm · Vercel

## Documentation

| File                                                       | Purpose                                                           |
| ---------------------------------------------------------- | ----------------------------------------------------------------- |
| [`AGENTS.md`](AGENTS.md)                                   | Rules for AI coding agents (Claude Code reads it via `CLAUDE.md`) |
| [`docs/PRD.md`](docs/PRD.md)                               | What and why: scope, requirements, success criteria               |
| [`docs/TRD.md`](docs/TRD.md)                               | Tech stack, architecture, API integration, CI/CD                  |
| [`docs/AppFlow.md`](docs/AppFlow.md)                       | Routes, screens and user journeys                                 |
| [`docs/Design.md`](docs/Design.md)                         | Design tokens: colors, type, spacing, motion, components          |
| [`docs/ImplementationPlan.md`](docs/ImplementationPlan.md) | Ordered task checklist by phase                                   |
| [`docs/PROGRESS.md`](docs/PROGRESS.md)                     | Done, in progress, bugs, decisions                                |
| [`docs/MEMORY.md`](docs/MEMORY.md)                         | Durable context, conventions and gotchas                          |
| [`docs/LabRules.md`](docs/LabRules.md)                     | How AI is (and is not) used in this lab                           |
| [`docs/adr/`](docs/adr)                                    | Architecture decision records                                     |
| [`CONTRIBUTING.md`](CONTRIBUTING.md)                       | Branches, commits and pull requests                               |

## Bootstrap (first time only)

`create-next-app` refuses to run in a non-empty folder, so generate the app first and then copy
this scaffold over it.

```bash
# 1. Generate the app (accept TypeScript, ESLint, Tailwind, App Router, src/, @/* alias, AGENTS.md)
npx create-next-app@latest atlas-ai-web --use-npm
cd atlas-ai-web

# 2. Copy every file from this scaffold into the project, overwriting:
#    eslint.config.mjs, .gitignore. Then merge the generated AGENTS.md:
#    keep its Next.js managed block at the top, followed by our rules.

# 3. Move the landing page into its route group
mkdir -p "src/app/(root)" && git mv src/app/page.tsx "src/app/(root)/page.tsx"

# 4. UI and data libraries
npx shadcn@latest init
npm install axios @tanstack/react-query zustand motion

# 5. Tooling
npm install -D prettier prettier-plugin-tailwindcss eslint-config-prettier \
  husky lint-staged @commitlint/cli @commitlint/config-conventional
npx husky init   # then restore the hook files from this scaffold
```

Then add the scripts and strict TypeScript flags from [`docs/TRD.md`](docs/TRD.md) §7, create
`.env.local` from `.env.example`, and run `npm run dev`.

## GitHub and Vercel setup

1. Push `main`, then create and push `staging`.
2. Run `./scripts/setup-github.sh <owner>/atlas-ai-web`. It sets `staging` as the default
   branch, configures merge methods and applies the rulesets in `.github/rulesets/`.
3. In Vercel, import the repo, set the production branch to `main`, and add the variables from
   `.env.example` for Production and Preview.

## Scripts

| Command                                   | What it does                         |
| ----------------------------------------- | ------------------------------------ |
| `npm run dev`                             | Start the dev server                 |
| `npm run build`                           | Production build                     |
| `npm run lint`                            | ESLint, including architecture rules |
| `npm run typecheck`                       | TypeScript without emitting          |
| `npm run format` / `npm run format:check` | Prettier write / check               |
| `npm run check`                           | Format check + lint + typecheck      |

## Project structure

```
src/
├── app/            (root) landing · (auth) login/signup · (app) authenticated app
├── components/     ui/ (shadcn) · common/ (shared composed components)
├── data/  types/  hooks/  services/  layouts/  lib/  utils/
├── templates/emails/
└── features/<feature>/  components · hooks · types · services · utils · helpers · index.ts
```

Rules for each folder are in [`AGENTS.md`](AGENTS.md) §3–4.

## AI tooling (frontend UI only)

Skills, installed per user so they stay out of the repo:

```bash
npx skills add https://github.com/anthropics/skills --skill frontend-design -g
```

MCP servers used in UI work: shadcn, 21st.dev, Context7, Playwright, and optionally Chrome
DevTools and Figma. API keys stay in your shell environment and are never committed.

## License

To be decided.
