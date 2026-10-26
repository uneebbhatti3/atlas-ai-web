# ADR-0001: Frontend stack and repository layout

|        |            |
| ------ | ---------- |
| Status | Accepted   |
| Date   | 2026-10-26 |

## Context

Atlas AI is a learning lab with a hand-written NestJS backend. The frontend needs to be
productive, modern and close to industry practice, while keeping the backend the focus of
deep learning.

## Options considered

1. **Monorepo** (`apps/web`, `apps/api`) — shared types and one CI, but more tooling to learn up
   front and a blurrier boundary between AI-assisted and hand-written code.
2. **Separate repositories** (`atlas-ai-web`, `atlas-ai-api`) — simpler CI per repo and a clear
   boundary, but API types are duplicated in the frontend.

## Decision

Separate repositories. Frontend stack: Next.js (latest), TypeScript strict, shadcn/ui, Tailwind
CSS, Lucide, Axios, TanStack Query, Zustand, Framer Motion, Prettier, ESLint, Husky, npm,
Vercel. No automated frontend tests for v0.1.

## Consequences

- API types are hand-maintained in `src/types` and feature `types/`. Drift from the backend is
  possible; keep `docs/MEMORY.md` → "API contracts" current. Generating types from an OpenAPI
  spec later is a good lab experiment.
- Without frontend tests, correctness relies on TypeScript, ESLint architecture rules, CI
  builds and the visual review step. Revisit after v0.1, starting with Playwright end-to-end
  tests for the auth journey, which has the highest risk.

## What I learned

_Fill in after Phase 1._
