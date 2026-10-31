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
- Hosting: Vercel. `main` = production, `integration` = integration preview, PRs = previews. No Docker.
- shadcn style is `base-vega` (Base UI, not Radix): no `asChild`; composition uses the `render` prop.
- `next.config.ts` has `cacheComponents` and `partialPrefetching` on. Env lives in `.env.local` (gitignored) and is read only via `lib/env.ts`; it throws at startup if `NEXT_PUBLIC_APP_URL` or `NEXT_PUBLIC_API_URL` is missing.
- Robots meta is `index, follow` only when `VERCEL_ENV === "production"`.
- Microsoft Clarity loads from `components/common/clarity-script.tsx` via `next/script`, only in production and only when `NEXT_PUBLIC_CLARITY_PROJECT_ID` is set (optional, so missing it never breaks a build).
- Crawler files: `robots.ts` blocks everything outside production and lists the auth/app routes as disallowed; add new public pages to `sitemap.ts`. `llms.txt` is a route handler built from `siteConfig` + landing FAQ. `public/.well-known/security.txt` has `Expires: 2027-10-27`; renew it before then (RFC 9116 makes an expired file invalid).

## Conventions established

- Data flow: component → hook (TanStack Query) → service (Axios) → `lib/api-client`.
- Server state only in TanStack Query; Zustand only for UI state.
- `lib/auth-client.ts` is the only network path that bypasses Axios.
- Query keys come from per-feature factories in `features/<f>/hooks/query-keys.ts`.
- Files are kebab-case; named exports except Next.js special files.
- Use `next/link`, `next/image`, `next/font`, `next/script` instead of raw elements, after reading the installed Next.js docs; only exceptions are JSON-LD `<script>` and JSX inside `ImageResponse` (`AGENTS.md` §5).
- shadcn first: no custom UI primitives, style shadcn components only via `className`/variants, never edit `src/components/ui/`, 21st.dev only via the shadcn registry (`AGENTS.md` §6).
- Link styled as a button: `<Link className={cn(buttonVariants({ variant }), "...")}>`. Wrap in `cn()`: cva only appends `className` and does not resolve conflicts.
- Type scale tokens: `text-display(-sm)`, `text-h1(-sm)`, `text-h2`, `text-h3`, `text-body-lg`, `text-caption`; widths `max-w-marketing` (980) and `max-w-marketing-wide` (1200).
- Landing motion: wrap below-the-fold content in `Reveal` (LazyMotion + `m`). Never wrap the hero (LCP).
- Palette: shadcn neutrals (black `#0a0a0a`) plus one brand hue: `brand` violet for brand moments, `brand-soft` lavender for panels and the headline highlight. Buttons stay near-black. Values and contrast live in `Design.md` §2.
- Headlines: one phrase on `<Highlight>`; the heading must be `isolate`. Use `tone="card"` (white block) when the heading sits on a lavender panel. Never small violet text on lavender (4.27:1).
- Font: Plus Jakarta Sans only (`--font-jakarta`), weights 400/500/600/800; JetBrains Mono for file names.
- Public copy never reveals build status or plans: no "In progress"/"Coming soon" labels, no roadmap, stages, "built in public" or future tense about features (owner request, 2026-10-30). Exception (2026-10-31): pricing may say "Coming soon" on plan CTAs, "Coming later" for agents, integrations and Team, and that paid plans are not live.
- Plans have one source of truth: every plan, price, limit and feature lives in `src/features/pricing/data/plans.ts`; no numbers in JSX. The frontend only displays limits; the backend enforces them.
- Plan CTAs stay disabled "Coming soon" until billing is live. `Plan.cta.disabled` is the literal `true` on purpose. No "Most popular", fake counts or testimonials.
- Marketing nav links use `/#section` so they work from `/pricing`; `MarketingNavLink` swaps a link for `offLandingHref` away from `/`.
- `--muted-foreground` is oklch(0.5), darker than the shadcn default, so muted text passes on muted and lavender too (5.5 / 5.2).
- Mocks are illustrations: wrap them in `inert` (hides from AT and removes focus, so shadcn `Input`/`Button` are allowed inside), label the window "Example" and add a visible caption.
- Do not describe the project as open source anywhere in the copy (owner request, 2026-10-26).
- All landing copy lives in typed files under `src/features/landing/data/`; footer links live in `src/data/site.ts`.
- Type token `text-display-lg` (72/76) is for the landing hero at `lg`+ only.
- Next.js has no video component, so raw `<video>` is the documented choice. Hero video stays `preload="none"` with a poster, then autoplays once 25% is in view (owner request, 2026-10-30), never with reduced motion. It tries sound at 100% first and falls back to muted when the browser blocks it; the volume slider stays at 100% either way. Paths and duration live in `heroVideo` (`data/hero.ts`); update `duration` if the file changes.
- Native video controls cannot be recoloured, so `HeroVideoPlayer` draws its own from shadcn `Button` and `Slider`. Colour is `--brand-player` (`#5E56FA`), kept separate from `--brand` (`#6355FF`) and used only there.
- shadcn `Slider` exposes only a root `className`: style parts with `**:data-[slot=slider-range]:...`, and name it with `aria-labelledby` on the root (Base UI forwards it to the thumb's input).

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
- 2026-10-26 — Base UI `<Button render={<Link/>} nativeButton={false}>` adds `role="button"` to the `<a>` (links announced as buttons) → use `buttonVariants` on `<Link>` (shadcn Base UI docs).
- 2026-10-26 — The `cn` package has no config and does not know custom `text-*` tokens: next to `text-sm` the base size wins, next to a color `text-caption` is dropped → never pass custom type tokens through `cn()` onto shadcn components; use them on plain elements.
- 2026-10-26 — Cache Components fails the build on `new Date()` during prerender → footer year lives in an async `"use cache"` component with `cacheLife("days")` (`layouts/current-year.tsx`).
- 2026-10-26 — Theme tokens must not be `none` for shadows: Tailwind composes ring + shadow into one `box-shadow`, so `none` kills rings too → use `0 0 #0000`.
- 2026-10-26 — `useReducedMotion()` is `null` on the server → keep `initial` identical and change only the transition, or hydration mismatches.
- 2026-10-26 — `npm install` while `next dev` runs left Turbopack serving stale CSS → restart the dev server after installing. Only one `next dev` per project directory is allowed.
- 2026-10-26 — Next 16 `Image`: `priority` is deprecated, use `preload`.
- 2026-10-26 — shadcn `SheetContent` close button is 32px → `showCloseButton={false}` plus a 44px `SheetClose`.
- 2026-10-26 — `next/dynamic` only code-splits when called from a Client Component, and a trigger outside the lazy chunk loses Base UI focus return → pass `finalFocus={triggerRef}` to `SheetContent` (`layouts/marketing-mobile-nav.tsx`).
- 2026-10-26 — Next dev fetches dynamic chunks eagerly; check lazy loading against `next build` output, not `next dev`.
- 2026-10-26 — A dashed card (`border`) sits 1px lower than a ring-only card → give solid cards `border border-transparent` when they share a row.
- 2026-10-26 — Playwright theme screenshots: next-themes reads `localStorage.theme` before `prefers-color-scheme` → set `localStorage.theme` and reload instead of emulating media.
- 2026-10-26 — `next dev` re-adds its managed rules block at the top of `AGENTS.md` → expected; keep it.
- 2026-10-26 — A CSS grid without explicit columns sizes its implicit column to the widest content, so a wide mock overflowed the page at 390px → `grid-cols-1` plus `min-w-0` on the child.
- 2026-10-26 — A `mask-image` fade also hides children → put masked backgrounds on their own `aria-hidden` layer, never on a content wrapper.
- 2026-10-26 — Headline wrapped to 3 lines in the fallback font and 4 in Inter Tight, a 0.039 CLS on mobile → render each sentence as its own `block` span (`heroContent.titleLines`).
- 2026-10-26 — shadcn `Tabs`/`Accordion` files are client modules, so Server Components can render them directly with server children; no wrapper needed. `TabsContent keepMounted` and `AccordionContent hiddenUntilFound` keep inactive content in the HTML (closed accordion panels are server-rendered with plain `hidden`).
- 2026-10-26 — A tab list whose labels are wider than the column stretches the whole `Tabs` block past the page padding → `min-w-0` on `Tabs`, `overflow-x-auto` on `TabsList`, small trigger padding on mobile.
- 2026-10-26 — `git mv -k` silently skips untracked files → use `mv` for files not yet committed.
- 2026-10-27 — An inline highlight background is taller than a tight line-height and painted over the line above, clipping descenders → `relative -z-10` on the highlight and `isolate` on the heading.
- 2026-10-27 — shadcn `TabsList` sets `group-data-horizontal/tabs:h-9`, which beats a plain `h-auto`; wrapped tab rows then overlap the panel → add `group-data-horizontal/tabs:h-auto`.
- 2026-10-27 — Playwright sometimes returns a blank frame right after a long scroll or reload → re-take the screenshot before concluding the page is broken.
- 2026-10-27 — CI failed with `Cannot find name LayoutProps`: route types (`LayoutProps`, `PageProps`) are generated into `.next/types` by `next dev`/`next build`, and CI typechecks before building on a clean checkout → `typecheck` script is `next typegen && tsc --noEmit`. Locally it passed only because `.next` already existed.
- 2026-10-30 — Turbopack missed a second quick edit to `globals.css`, leaving a new token undefined and its colour transparent → make a real content change to recompile; `touch` does nothing because it watches content.
- 2026-10-26 — Base UI tabs use manual activation: arrow keys move focus, Enter/Space selects. Expected ARIA behaviour, not a bug.
- 2026-10-26 — `next dev` was killed for low system memory (~1.6 GB free) → verify with `next build` + `next start` (lighter) and stop it afterwards.

## Component and pattern inventory

_What exists and where, so nothing gets built twice._

| Component / pattern                                             | Location                                        | Notes                                                       |
| --------------------------------------------------------------- | ----------------------------------------------- | ----------------------------------------------------------- |
| `MarketingLayout` (header, mobile sheet nav, footer)            | `src/layouts/marketing/`                        | Sheet panel lazy-loaded (`marketing-mobile-sheet.tsx`)      |
| `ThemeToggle`                                                   | `src/components/common/theme-toggle.tsx`        | Client; light/dark via `next-themes`                        |
| `Reveal`                                                        | `src/components/common/reveal.tsx`              | Client motion wrapper, `as="div"                            | "li"`, `index` staggers |
| One component per landing section                               | `src/features/landing/components/*-section.tsx` | Exported from `src/features/landing/index.ts`               |
| `Highlight`, `SectionHeading`, `CheckItem`, `FaqAccordion`      | `src/components/common/`                        | Promoted when pricing became the second feature to use them |
| `ProductWindow`                                                 | `src/features/landing/components/`              | Landing building block                                      |
| `BillingTabs`, `PlanCard`, `ComparisonTable`, `PricingSection`  | `src/features/pricing/components/`              | Exported from `src/features/pricing/index.ts`               |
| Concept mocks: `ChatBubble`, `NotificationCard`, `CitationChip` | `src/features/landing/components/mocks/`        | Render inside `inert`                                       |
| `LogoMark` (violet app-icon tile)                               | `src/components/common/logo-mark.tsx`           | Header, footer, notification cards                          |
| Footer columns                                                  | `src/data/site.ts` (`footerColumns`)            | Typed `FooterColumn` in `src/types/site.ts`                 |
| Site config and nav links                                       | `src/data/site.ts`                              | Used by metadata, layouts and JSON-LD                       |
| JSON-LD builder                                                 | `src/features/landing/helpers/build-json-ld.ts` | `schema-dts` `Graph`; rendered in `app/(root)/page.tsx`     |

## Open questions

- TODO: add Pro `Offer` structured data when billing launches. Until then JSON-LD keeps only the free offer.
- Cookie strategy (`TRD.md` §5)
- Ownership of email templates (web vs API repo)
- Public demo limits before sharing the live URL
- Repository license
- First-load JS is 225.1 KB against the revised ~200 KB budget (PROGRESS B-1)
- shadcn default focus ring (1.54:1 light) and `--input` (1.26:1) fail 3:1; fix before the first form (`Design.md` §2)
- ADR links point to `sessions/adr` on `main`; they 404 until those files are pushed
- Hero promo video needs a captions `.vtt` if it has speech (AGENTS.md accessibility); consider compressing it or moving it to Vercel Blob
