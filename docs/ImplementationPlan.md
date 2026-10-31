# Implementation Plan: Atlas AI Web v0.1

Ordered checklist. Finish each phase's **done when** criteria before starting the next.
After each feature, update `PROGRESS.md` and `MEMORY.md` (see `AGENTS.md` §7).

Legend: 🧑 = owner writes by hand · 🤖 = AI may build (UI) · 🔗 = needs a backend endpoint

---

## Phase 0: Project setup 🧑

- [ ] Create the GitHub repo `atlas-ai-web` (public)
- [ ] Run `create-next-app` (TypeScript, Tailwind, ESLint, App Router, `src/`, `@/*`, AGENTS.md)
- [ ] Copy this scaffold over the generated project (see `README.md` → Bootstrap)
- [ ] Move `src/app/page.tsx` into `src/app/(root)/page.tsx`
- [ ] Merge the Next.js managed block into our `AGENTS.md`
- [ ] Add strict TypeScript flags (`TRD.md` §7.1)
- [ ] Install dependencies: shadcn/ui init, axios, @tanstack/react-query, zustand, motion
- [ ] Install dev tooling: prettier + tailwind plugin, husky, lint-staged, commitlint, eslint-config-prettier
- [ ] Replace `eslint.config.mjs` with the provided version; fix any violations
- [ ] Create `integration` branch; run `scripts/setup-github.sh` (rulesets, default branch, merge settings)
- [ ] Connect Vercel: production branch `main`, environment variables per environment
- [ ] Install MCP servers and skills (`README.md` → AI tooling)

**Done when:** a throwaway `feature/test` PR into `integration` runs CI, merges by squash, deploys an
integration preview; a `integration → main` PR deploys production; a direct push to `main` is rejected.

## Phase 1: Foundations

- [ ] 🤖 Design tokens in `globals.css` from `Design.md` (colors, radius, shadows, motion)
- [ ] 🤖 Fonts via `next/font` (Inter, Inter Tight, JetBrains Mono)
- [ ] 🤖 Theme toggle (light/dark/system)
- [ ] 🧑 `lib/env.ts` with validated environment variables
- [ ] 🧑 `lib/api-client.ts` (Axios instance, `ApiError` normalization, 401 handling)
- [ ] 🧑 `lib/query-client.ts` and `QueryClientProvider` in the root layout
- [ ] 🧑 `types/api.ts` (`ApiErrorBody`, `Paginated<T>`)
- [ ] 🤖 Base shadcn components: button, input, label, card, dialog, dropdown-menu, sheet,
      skeleton, sonner/toast, badge, separator, tooltip, avatar
- [ ] 🤖 Shared states: `EmptyState`, `ErrorState`, `PageSkeleton`

**Done when:** a sample page renders every token and component in both themes and passes the
Playwright visual check.

## Phase 2: Landing page 🤖

- [ ] `MarketingLayout`: translucent nav, footer
- [ ] Hero: headline, subhead, primary CTA, GitHub link
- [ ] Sections: what Atlas is, the hierarchy (Workspace → Project → Document → AI), "built as an
      engineering lab" story, GitHub call to action
- [ ] Scroll animations with reduced-motion fallback
- [ ] Metadata, Open Graph image, favicon

**Done when:** Lighthouse ≥ 95 performance and accessibility on mobile; LCP < 2.5 s.

## Phase 3: Authentication 🔗

> Decide the cookie strategy first (`TRD.md` §5) and record it as an ADR.

- [ ] 🧑 `lib/auth-client.ts` (Better Auth React client)
- [ ] 🤖 `AuthLayout` and screens: login, signup, forgot password, reset password (UI with mock submit)
- [ ] 🧑 Wire forms to the auth client; map auth errors to messages
- [ ] 🧑 Route protection in `proxy.ts` (optimistic redirect)
- [ ] 🧑 `next` parameter redirect after login; guest-only redirect for `(auth)`
- [ ] 🤖 User menu with sign out

**Done when:** sign up → log out → log in → reset password works against the real API, and an
expired session redirects to login without a broken screen.

## Phase 4: App shell 🤖

- [ ] `AppShell`: sidebar (collapsible), top bar with breadcrumbs, mobile sheet navigation
- [ ] `(app)/layout.tsx` using the shell
- [ ] Dashboard with mock data (recent workspaces, recent projects, empty state)

## Phase 5: Workspaces 🔗

- [ ] 🧑 `features/workspaces/types`, `services`, `hooks` (`query-keys`, list, detail, create,
      update, archive, delete)
- [ ] 🤖 List, card, create dialog, settings page, archive and delete confirmations
- [ ] 🧑 Optimistic update for rename (learning exercise: rollback on error)
- [ ] Sidebar lists real workspaces; dashboard uses real data

## Phase 6: Projects 🔗

- [ ] 🧑 `features/projects` types, services, hooks
- [ ] 🤖 Project list inside workspace, create/edit dialogs, archive/delete
- [ ] Breadcrumbs: Workspace › Project

## Phase 7: Documents 🔗

- [ ] 🧑 `features/documents` types, services, hooks
- [ ] 🤖 Document list, create document, Markdown editor/viewer, rename, delete
- [ ] 🧑 Autosave with debounce and "saved / saving / failed" indicator
- [ ] Breadcrumbs: Workspace › Project › Document

## Phase 8: Account settings 🔗

- [ ] 🤖 Settings layout with tabs: profile, security, account
- [ ] 🧑 Profile update, change password
- [ ] 🧑 Sessions list with revoke one / revoke all others
- [ ] 🧑 Delete account with typed confirmation

## Phase 9: Polish and release v0.1

- [ ] Global title search (F-12)
- [ ] Error boundaries and `not-found` pages for every route group
- [ ] Accessibility pass (keyboard-only walkthrough of every journey in `AppFlow.md`)
- [ ] Performance pass against `TRD.md` §9 budgets
- [ ] Tag `v0.1.0`, write a retrospective in `PROGRESS.md`

---

## Later phase: Billing and entitlements (web)

- [x] Pricing page and landing pricing section
- [ ] Usage meters
- [ ] Upgrade flow
- [ ] Own-key settings (Settings → API keys)
- [ ] Limit-reached states (`PLAN_LIMIT_REACHED`)

---

## After v0.1 (follows backend stages)

Stage 2 uploads and processing status → Stage 3 search UI → Stage 4 AI chat with streaming and
citations → later stages per the product spec.
