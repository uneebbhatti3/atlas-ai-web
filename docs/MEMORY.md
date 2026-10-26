# Memory: Atlas AI Web

Durable context for AI agents and for the owner's future self. `PROGRESS.md` answers
"where are we?"; this file answers "what must I remember to avoid repeating mistakes?".

Rules for this file:

- Keep entries short and specific. One line per fact where possible.
- Update after every feature, in the matching section.
- Delete entries that become false. Stale memory is worse than no memory.
- Never store secrets, tokens or personal data here (the repo is public).

---

## Project facts

- Frontend only. Backend lives in `atlas-ai-api` (NestJS, Better Auth, PostgreSQL), written by hand.
- Never design database schemas or backend endpoints from this repo.
- Package manager is npm (commit `package-lock.json`; CI uses `npm ci`). Node version is in `.nvmrc`.
- Hosting: Vercel. `main` = production, `staging` = staging, PRs = previews. No Docker.

## Conventions established

- Data flow: component → hook (TanStack Query) → service (Axios) → `lib/api-client`.
- Server state only in TanStack Query; Zustand only for UI state.
- `lib/auth-client.ts` is the only network path that bypasses Axios.
- Query keys come from per-feature factories in `features/<f>/hooks/query-keys.ts`.
- Files are kebab-case; named exports except Next.js special files.

## API contracts known so far

_Record each endpoint once the backend defines it: method, path, request and response types,
error codes. Link the backend file if useful._

| Method | Path | Request | Response | Errors |
| ------ | ---- | ------- | -------- | ------ |
| —      | —    | —       | —        | —      |

## Gotchas and lessons

_Things that broke or surprised you, and the fix. Format: `YYYY-MM-DD — problem → fix`._

- 2026-10-26 — Cross-site cookies between `*.vercel.app` and a separately hosted API will
  break Better Auth sessions → decide same-site domains, a Next.js proxy or bearer tokens
  before auth work (`TRD.md` §5).

## Component and pattern inventory

_What exists and where, so nothing gets built twice._

| Component / pattern | Location | Notes |
| ------------------- | -------- | ----- |
| —                   | —        | —     |

## Open questions

- Cookie strategy (`TRD.md` §5)
- Ownership of email templates (web vs API repo)
- Public demo limits before sharing the live URL
- Repository license
