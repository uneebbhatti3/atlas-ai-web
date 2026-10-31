# Technical Requirements: Atlas AI Web

|              |                                             |
| ------------ | ------------------------------------------- |
| Status       | Draft v0.1                                  |
| Last updated | 2026-10-26                                  |
| Related      | `PRD.md`, `AppFlow.md`, `Design.md`, `adr/` |

## 1. Tech stack

| Concern         | Choice                                       | Notes                                                                     |
| --------------- | -------------------------------------------- | ------------------------------------------------------------------------- |
| Framework       | Next.js (latest 16.x, App Router, Turbopack) | Check bundled docs and Context7; APIs differ from older versions.         |
| Language        | TypeScript, strict mode                      | See §7 for extra compiler flags.                                          |
| UI primitives   | shadcn/ui                                    | Generated into `src/components/ui/`.                                      |
| Styling         | Tailwind CSS v4                              | Tokens defined as CSS variables in `globals.css` (values in `Design.md`). |
| Icons           | Lucide                                       | Ships with shadcn/ui.                                                     |
| HTTP            | Axios                                        | Single instance in `lib/api-client.ts`.                                   |
| Server state    | TanStack Query                               | Single `QueryClient` in `lib/query-client.ts`.                            |
| Client state    | Zustand                                      | UI state only.                                                            |
| Auth client     | Better Auth (React client)                   | `lib/auth-client.ts`; the only non-Axios network path.                    |
| Animation       | Framer Motion (`motion` package)             | Landing page and subtle UI transitions.                                   |
| Formatting      | Prettier + `prettier-plugin-tailwindcss`     |                                                                           |
| Linting         | ESLint (flat config) + `eslint-config-next`  | Architecture rules enforced, see §7.                                      |
| Git hooks       | Husky + lint-staged + commitlint             |                                                                           |
| Package manager | npm                                          | Commit `package-lock.json`; CI installs with `npm ci`.                    |
| Node.js         | 24 LTS (`.nvmrc`)                            |                                                                           |
| Hosting         | Vercel                                       | `main` → production, `integration` → integration preview, PRs → previews. |
| Tests           | None for the frontend                        | Recorded decision; revisit after v0.1.                                    |

### Recommended additions (not yet approved)

These are standard in shadcn/ui projects. Add only after the owner approves:

| Package                                           | Why                                                                                |
| ------------------------------------------------- | ---------------------------------------------------------------------------------- |
| `zod` + `react-hook-form` + `@hookform/resolvers` | shadcn's Form components are built on them; typed validation shared with API DTOs. |
| `next-themes`                                     | Light/dark theme switching without a flash on load.                                |
| `sonner`                                          | shadcn's toast component.                                                          |

## 2. Architecture overview

```
Browser
  │
  ├─ Next.js (Vercel)
  │    ├─ app/ routes ── layouts/ ── features/*/components
  │    │                              │
  │    │                     features/*/hooks (TanStack Query)
  │    │                              │
  │    │                     features/*/services (Axios)
  │    │                              │
  │    └─ lib/api-client.ts ──────────┘
  │
  └─ HTTP (cookies) ─────────────► atlas-ai-api (NestJS + Better Auth + PostgreSQL)
```

The frontend holds no business rules about authorization. It renders what the API returns and
handles HTTP errors consistently.

## 3. Rendering strategy

| Area             | Strategy                                                       | Reason                                 |
| ---------------- | -------------------------------------------------------------- | -------------------------------------- |
| `(root)` landing | Static (Server Components)                                     | Fast, SEO-friendly, no user data.      |
| `(auth)` pages   | Server Component shell + client form                           | Forms need interactivity only.         |
| `(app)` pages    | Server Component layout + client data views via TanStack Query | Data is user-specific and interactive. |

Route protection uses the Next.js request interception file (named `proxy.ts` in Next.js 16;
verify against the bundled docs). It performs an **optimistic** check (session cookie present)
and redirects to `/login`. Real authorization always happens in the API.

## 4. API integration

### 4.1 Axios instance (`lib/api-client.ts`)

- `baseURL` from `env.NEXT_PUBLIC_API_URL`.
- `withCredentials: true`, so the Better Auth session cookie is sent.
- Response interceptor converts every failure into a typed `ApiError`
  (`status`, `code`, `message`, `details`). Hooks and components only ever see `ApiError`.
- On 401: clear the query cache and redirect to `/login?next=<current path>`.

### 4.2 Response contract (to agree with the backend)

The owner defines the final contract in `atlas-ai-api`. Until then, the frontend assumes:

```ts
// types/api.ts
export interface ApiErrorBody {
  statusCode: number;
  code: string; // stable machine-readable code, e.g. "WORKSPACE_NOT_FOUND"
  message: string; // human-readable
  details?: unknown; // validation errors etc.
}

export interface Paginated<T> {
  items: T[];
  nextCursor: string | null;
}
```

Plan limits: the website only displays them. Plan data lives in
`src/features/pricing/data/plans.ts`. The backend enforces every limit and answers with error
code `PLAN_LIMIT_REACHED` plus the limit name.

### 4.3 Query key factory pattern

```ts
// features/workspaces/hooks/query-keys.ts
export const workspaceKeys = {
  all: ["workspaces"] as const,
  lists: () => [...workspaceKeys.all, "list"] as const,
  detail: (id: string) => [...workspaceKeys.all, "detail", id] as const,
};
```

### 4.4 Endpoints needed for v0.1 (to be designed by the owner in the API)

Workspaces, projects and documents need list, detail, create, update, archive and delete.
Account needs profile read/update and session list/revoke. Better Auth provides sign-up,
sign-in, sign-out, password reset and session endpoints itself. Exact paths and DTOs are
recorded here once the backend defines them.

## 5. Cross-site cookies: decision required before auth work

**This is the most important open technical question for the frontend.**

Better Auth uses cookie sessions. If the web app runs on `atlas-ai-web.vercel.app` and the API
runs on a different site (for example `atlas-api.onrender.com`), the session cookie is a
third-party cookie. Browsers increasingly block those, so login will appear to work and then
silently fail. `vercel.app` is also on the Public Suffix List, so you cannot share cookies
across `*.vercel.app` subdomains.

Options:

| Option                                        | How                                                                            | Trade-off                                                          |
| --------------------------------------------- | ------------------------------------------------------------------------------ | ------------------------------------------------------------------ |
| **A. Same-site custom domains (recommended)** | `app.<domain>` for web, `api.<domain>` for API; cookie `SameSite=Lax`          | Needs a domain (cheap); cleanest, and teaches DNS/TLS.             |
| B. Proxy through Next.js                      | Next.js rewrites `/api/*` to the backend; browser only talks to the web origin | No domain needed; adds a hop and hides the API origin.             |
| C. Bearer tokens                              | Better Auth bearer plugin; token stored client-side                            | Works anywhere, also suits the mobile app; XSS exposure of tokens. |

Record the choice as an ADR before building F-02.

## 6. Environment variables

All access goes through `lib/env.ts`, which validates at startup and exports a typed object.

| Variable              | Example                 | Scope             |
| --------------------- | ----------------------- | ----------------- |
| `NEXT_PUBLIC_APP_URL` | `http://localhost:3000` | Client and server |
| `NEXT_PUBLIC_API_URL` | `http://localhost:4000` | Client and server |

MCP API keys (`CONTEXT7_API_KEY`, `TWENTYFIRST_API_KEY`) are **developer machine** variables
for the AI tools. They are never read by the app and never committed.

## 7. Tooling configuration

### 7.1 TypeScript (add to the generated `tsconfig.json`)

```jsonc
{
  "compilerOptions": {
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "noImplicitOverride": true,
    "noFallthroughCasesInSwitch": true,
    "forceConsistentCasingInFileNames": true,
  },
}
```

### 7.2 ESLint

`eslint.config.mjs` (provided) enforces the architecture rules so they do not rely on memory:

- `@typescript-eslint/no-explicit-any`: error.
- Axios may be imported only in `services/` folders and `lib/api-client.ts`.
- Shared folders cannot import from `features/`.
- Features cannot reach into another feature's internals.
- `eslint-config-prettier` disables formatting rules that conflict with Prettier.

### 7.3 Scripts (`package.json`)

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint . --max-warnings=0",
    "typecheck": "tsc --noEmit",
    "format": "prettier --write .",
    "format:check": "prettier --check .",
    "check": "npm run format:check && npm run lint && npm run typecheck",
    "prepare": "husky"
  }
}
```

## 8. Git workflow and CI/CD

See `CONTRIBUTING.md` for the day-to-day workflow and `adr/0003-branching-model.md` for the
reasoning.

```
feature/*  ──PR (squash)──►  integration  ──PR (merge commit)──►  main
                                  │                                  │
                         Vercel integration               Vercel production
```

| Guard                                                                | Where                                                 |
| -------------------------------------------------------------------- | ----------------------------------------------------- |
| No direct pushes to `main`/`integration`, no force-push, no deletion | GitHub rulesets (`.github/rulesets/`)                 |
| PR required, conversations resolved                                  | GitHub rulesets                                       |
| Format, lint, typecheck and build must pass                          | `ci.yml` → required check **Quality checks**          |
| PRs into `main` must come from `integration`                         | `branch-flow.yml` → required check **Branch flow**    |
| PR titles follow Conventional Commits                                | `branch-flow.yml` → required check **PR title**       |
| Local safety net                                                     | Husky `pre-push` blocks pushing to protected branches |

Merge methods matter: feature PRs are **squashed** into `integration` (clean history), but
`integration` is merged into `main` with a **merge commit**. Squashing `integration` into `main` would
give `main` commits that `integration` does not have, and the branches would drift apart.

Docker is intentionally not used for the frontend (see `adr/0002-no-docker-for-frontend.md`).

## 9. Performance and accessibility budgets

| Metric                    | Target                                          |
| ------------------------- | ----------------------------------------------- |
| LCP (landing, mobile, 4G) | < 2.5 s                                         |
| CLS                       | < 0.1                                           |
| INP                       | < 200 ms                                        |
| First-load JS on landing  | ~200 KB gzip (framework baseline ~173 KB)       |
| Lighthouse accessibility  | ≥ 95                                            |
| Text contrast             | WCAG 2.2 AA (4.5:1 body, 3:1 large text and UI) |

## 10. Open questions

1. **Cookie strategy** (§5): custom domain, proxy or bearer tokens?
2. **Email templates:** emails are sent by the API, so templates usually live in
   `atlas-ai-api`. Keep `src/templates/emails/` here only if the web app previews them;
   otherwise move it to the API repo.
3. **Public demo limits:** invite-only sign-up, quotas and data-wipe policy (decide before
   sharing the live URL).
4. **License** for the public repository.
