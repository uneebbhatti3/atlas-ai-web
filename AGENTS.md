<!-- BEGIN:nextjs-agent-rules -->
<!--
  This block is managed by Next.js. `create-next-app` (and `next dev` on 16.3+, when an
  agent is detected) writes the official Next.js agent rules between these markers.
  Keep the markers; put nothing of our own between them. Everything below END is ours.
-->
<!-- END:nextjs-agent-rules -->

# Atlas AI Web: Agent Rules

These rules apply to every AI coding agent working in this repository (Claude Code, Cursor,
and any other tool that reads `AGENTS.md`). `CLAUDE.md` imports this file, so there is one
source of truth.

## 0. Read before you write anything

At the start of every session, read these files in this order before writing code:

1. `docs/MEMORY.md`: conventions, gotchas and decisions to carry forward
2. `docs/PROGRESS.md`: what is done, in progress and broken
3. `docs/ImplementationPlan.md`: what comes next
4. `docs/TRD.md`: architecture, data flow and folder rules
5. `docs/Design.md`: before any UI work
6. `docs/AppFlow.md`: before building a screen or route
7. `docs/PRD.md`: when scope is unclear

If a request conflicts with these documents, stop and ask. Do not silently pick one.

## 1. Project context

- Atlas AI is a personal engineering lab. The owner is learning in depth, so explain
  non-obvious choices briefly in your summary at the end of a task.
- This repository is the **frontend only** (`atlas-ai-web`). The backend is a separate
  NestJS repository (`atlas-ai-api`) that the owner writes by hand.
- **Never design or propose database schemas, tables, Prisma models or backend endpoints.**
  If a screen needs data whose API contract does not exist in `docs/TRD.md` yet, use typed
  mock data from `src/data/` and list the endpoint you would need in your summary.

## 2. What AI may write (scope boundary)

| Area                                                             | Default                                                       | Notes                                                   |
| ---------------------------------------------------------------- | ------------------------------------------------------------- | ------------------------------------------------------- |
| Components, pages, layouts, styling, animation, landing page     | ✅ Allowed                                                    | Your main job.                                          |
| `src/data/` mock data used to build UI                           | ✅ Allowed                                                    | Must be typed.                                          |
| UI-only types (component props, view models)                     | ✅ Allowed                                                    |                                                         |
| `services/`, API hooks in `hooks/`, API DTO types                | ⛔ Only when the owner explicitly asks in the current request |                                                         |
| `lib/api-client.ts`, `lib/auth-client.ts`, `lib/query-client.ts` | ⛔ Only when explicitly asked                                 |                                                         |
| Zustand stores containing business logic                         | ⛔ Only when explicitly asked                                 | Pure UI stores (sidebar open, modal state) are allowed. |
| CI workflows, rulesets, Husky hooks, ESLint/TS config            | ⛔ Only when explicitly asked                                 |                                                         |
| New dependencies                                                 | ⛔ Ask first                                                  | State the package, why, and its bundle cost.            |

"Explicitly asked" means the current request names that work. A past approval does not carry
over to a later task.

## 3. Architecture and folder rules

```
src/
├── app/                 Routes only: thin page.tsx/layout.tsx files that compose features
│   ├── (root)/          Public marketing/landing pages
│   ├── (auth)/          login, signup, forgot/reset password
│   └── (app)/           Authenticated app: dashboard, workspaces, projects, documents, settings
├── components/
│   ├── ui/              shadcn/ui generated primitives; avoid editing, wrap instead
│   └── common/          Shared composed components used by 2+ features
├── data/                Static content and typed mock data
├── types/               Shared types (API envelopes, common DTOs, utility types)
├── hooks/               Shared hooks (TanStack Query hooks for shared resources, UI hooks)
├── services/            Shared API calls with Axios ONLY
├── templates/emails/    Email templates (see TRD open question on ownership)
├── layouts/             Layout components (AppShell, AuthLayout, MarketingLayout)
├── lib/                 Configured instances: api-client, query-client, auth-client, cn, env
├── utils/               Pure, framework-agnostic helpers (formatting, parsing)
└── features/<feature>/
    ├── components/      Feature UI
    ├── hooks/           Feature TanStack Query hooks + feature UI hooks
    ├── types/           Feature types
    ├── services/        Feature API calls (Axios only)
    ├── utils/           Pure functions for this feature
    ├── helpers/         Feature-specific glue (mappers, view-model builders)
    └── index.ts         Public API of the feature; other code imports only from here
```

Dependency direction (enforced by ESLint where possible):

- `app/` → `features/`, `layouts/`, `components/`; pages stay thin.
- `features/A` must not import from `features/B/...` internals. Use `@/features/B` (its `index.ts`).
- Inside a feature, import its own files with relative paths (`../hooks/use-workspaces`).
  ESLint blocks every `@/features/<name>/<folder>` import, including from inside the feature.
- Shared folders (`components/`, `hooks/`, `services/`, `lib/`, `utils/`, `types/`) must
  never import from `features/`.
- Code used by only one feature lives in that feature. Promote it to a shared folder only
  when a second feature needs it.

## 4. Data flow (do not deviate)

```
Component → hook (TanStack Query) → service (Axios) → lib/api-client → atlas-ai-api
```

- **Services** only call the backend with the shared Axios instance from `lib/api-client.ts`.
  They return typed data. No React, no toasts, no routing, no state.
- **Hooks** wrap services with `useQuery`/`useMutation`. Query keys come from a per-feature
  key factory (`features/<f>/hooks/query-keys.ts`). Mutations invalidate the affected keys.
- **Server state lives only in TanStack Query.** Never copy API data into Zustand.
- **Zustand** holds client-only UI state (sidebar, command palette, UI preferences).
- **Authentication** goes through `lib/auth-client.ts` (Better Auth client). This is the only
  documented exception to "Axios only".
- Components never call Axios or services directly.

## 5. Coding rules

TypeScript:

- Never use `any`. Use `unknown` and narrow it.
- No `@ts-ignore` or `@ts-expect-error` without a comment explaining why, and no `as` casts
  used to silence the compiler.
- Put types in a `types/` folder (shared or feature-level), not inline in components, except
  a component's own props interface, which may live next to it.
- API types mirror the backend contract exactly. Do not invent fields.

React and Next.js:

- Server Components by default. Add `"use client"` only where interactivity requires it, and
  push it as far down the tree as possible.
- Before using any Next.js API, read the version-matched docs (the managed block above and
  Context7). This project uses a recent Next.js whose APIs may differ from your training data.
- Named exports everywhere except files Next.js requires to default-export (`page`, `layout`,
  `loading`, `error`, `not-found`, `template`).
- Keep components small and focused. Split anything that grows past roughly 200 lines.

Naming:

- Files and folders: `kebab-case` (`workspace-card.tsx`).
- Components: `PascalCase`. Hooks: `useSomething`. Services: `somethingService` objects or
  verb-first functions (`getWorkspaces`).
- Zustand stores: `use<Name>Store` in `<name>-store.ts`.

Styling:

- Use Tailwind with the design tokens from `docs/Design.md`. No hardcoded hex values,
  arbitrary spacing or one-off font sizes in components.
- Every interactive element needs visible focus, an accessible name and a hit target of at
  least 44×44 px.
- Respect `prefers-reduced-motion` in all Framer Motion animations.

Hygiene:

- No `console.log` in committed code. `console.warn`/`console.error` only with a reason.
- Read environment variables only through `lib/env.ts`. Never read `process.env` elsewhere.
- Never commit secrets, API keys or `.env.local`.
- Delete dead code instead of commenting it out.

## 6. UI workflow (every UI task)

1. **Docs first.** Use the Context7 MCP to check the current docs for Next.js, Tailwind CSS,
   shadcn/ui, TanStack Query and Framer Motion before writing code that uses them.
2. **Design direction.** Follow `docs/Design.md`. Use the **apple-design** skill to plan and
   review screens, and the **frontend-design** skill for execution craft. If they pull in
   different directions, Apple-style restraint wins. The Apple skill is written for native
   apps, so translate its guidance to web conventions (for example, no mobile tab bar on
   desktop web).
3. **Components.**
   - Base primitives come from the **shadcn MCP** (`components/ui/`).
   - Polished sections (hero, feature grids, pricing-style blocks) may come from the
     **21st.dev MCP**. Every imported component must be adapted before use: remove `any`,
     replace hardcoded colors and spacing with tokens, check its dependencies and ask before
     adding new packages, and add reduced-motion handling.
4. **Verify visually.** After every UI change, use the **Playwright MCP** to screenshot:
   - mobile at 390×844 and desktop at 1440×900
   - light and dark themes
     Then run an apple-design review against the screenshots and fix the issues it finds
     before reporting the task as done.
5. **Optional tools.** Chrome DevTools MCP for runtime debugging (console, network,
   performance). Figma MCP when the owner provides a Figma file.

## 7. Definition of done (per feature)

A feature is done only when all of these are true:

- [ ] `npm run lint`, `npm run typecheck`, `npm run format:check` and `npm run build` pass
- [ ] Mobile and desktop screenshots reviewed, in light and dark themes
- [ ] Loading, empty and error states exist for every data-driven view
- [ ] Keyboard navigation and focus order work
- [ ] `docs/PROGRESS.md` updated (done items, new bugs, decisions)
- [ ] `docs/MEMORY.md` updated with anything a future session must know
- [ ] Summary to the owner lists files changed, decisions made and any endpoints needed

Update **both** `docs/PROGRESS.md` and `docs/MEMORY.md` before starting the next feature.

## 8. Git rules for agents

- Never commit to, push to or merge into `main` or `staging`.
- Work on the current `feature/*`, `fix/*`, `chore/*`, `docs/*` or `refactor/*` branch.
- Do not push, open pull requests or merge unless the owner asks in the current request.
- Commit messages follow Conventional Commits (`feat(workspaces): add empty state`).

## 9. Never

- Never design database schemas or backend endpoints.
- Never write services, API hooks or auth handling unless explicitly asked.
- Never add a dependency without asking.
- Never disable an ESLint rule, TypeScript check or CI step to make something pass.
- Never mark a task done without the visual check in section 6.
