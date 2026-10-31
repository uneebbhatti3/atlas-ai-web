# Progress: Atlas AI Web

Living status of the frontend. Update after every feature, before starting the next one.
Newest entries go at the top of each section.

**Current phase:** Phase 0: Project setup
**Current version:** unreleased (target `v0.1.0`)
**Last updated:** 2026-10-31

---

## ✅ Done

| Date       | Item                                                                                                                                                                      | PR  | Notes                                                                        |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --- | ---------------------------------------------------------------------------- |
| 2026-10-31 | Plan cards taller; "What's included" label lines up across both cards                                                                                                     | —   | Owner request; description reserves equal height from `md`                   |
| 2026-10-31 | Removed the violet gradient edge and glow from the Pro plan card                                                                                                          | —   | Owner request; `--pro-gradient` token deleted, white 10% ring added          |
| 2026-10-31 | Pro plan card gets a gradient edge and glow (card background stays plain); a note under every price; yearly badge removed                                                 | —   | Owner request; `--pro-gradient` token                                        |
| 2026-10-31 | Pricing: Free and Pro plans before the landing FAQ, `/pricing` with comparison table and FAQ, nav, footer, sitemap and `llms.txt`                                         | —   | Monthly/yearly toggle does not shift layout; `plans.ts` is the single source |
| 2026-10-31 | FAQ now says Atlas will have paid plans; free and zero-price claims removed from JSON-LD                                                                                  | —   | Owner request                                                                |
| 2026-10-30 | Removed build status from public pages: status badges, Roadmap section and nav links, stage and "built in public" copy, sign-ups FAQ; "Concept" labels now read "Example" | —   | Owner request                                                                |
| 2026-10-30 | Promo video in the hero, above the concept demo (`HeroVideo`): autoplay on view, custom `#5E56FA` controls, poster from the 12 s frame                                    | —   | No captions yet; 33 MB file served from `public/`                            |
| 2026-10-27 | Landing rebuilt after shipanysaas.com: hero demo, hierarchy tiles, before/after, feature explorer, privacy, chat how-it-works, roadmap cards, FAQ, CTA, wordmark footer   | —   | Mobile 4× CPU + Slow 4G: LCP 1.84 s, CLS 0.003                               |
| 2026-10-26 | Landing rebuild (black and white SaaS page): hero, problem/solution, bento, tabs, stepper, audiences, trust, roadmap, FAQ, CTA                                            | —   | Mobile 4× CPU + Slow 4G: LCP 1.95 s, CLS 0.002                               |
| 2026-10-26 | Landing redesign: product window hero, tabbed product tour, decision log, amber accent                                                                                    | —   | Mobile 4× CPU + Slow 4G: LCP 2.06 s, CLS 0.004                               |
| 2026-10-26 | Landing review: lazy mobile sheet, How it works connectors, DevTools trace                                                                                                | —   | Mobile 4× CPU + Slow 4G: LCP 1.88 s, CLS 0; desktop 0.35 s                   |
| 2026-10-26 | Landing page: nav, hero, how it works, capabilities, roadmap, lab, open source, footer                                                                                    | —   | `feature/landing-page`; site metadata, viewport, JSON-LD                     |
| 2026-10-26 | Design tokens, fonts and light/dark theme                                                                                                                                 | —   | `globals.css`, `next/font`, `next-themes`                                    |
| 2026-10-26 | `lib/env.ts` (written by AI at the owner's request)                                                                                                                       | —   | `NEXT_PUBLIC_APP_URL`, `NEXT_PUBLIC_API_URL`, `VERCEL_ENV`                   |
| 2026-10-26 | Project documentation and repo configuration scaffolded                                                                                                                   | —   | AGENTS.md, docs/, CI, rulesets, tooling configs                              |

## 🚧 In progress

| Item                   | Branch | Started    | Notes                       |
| ---------------------- | ------ | ---------- | --------------------------- |
| Phase 0: Project setup | —      | 2026-10-26 | See `ImplementationPlan.md` |

## ⏭️ Next up

1. Landing follow-ups: apple-touch-icon and 192/512 PNG manifest icons (`robots.ts`, `sitemap.ts`, `manifest.ts`, `llms.txt`, `ads.txt`, `security.txt` done 2026-10-27; Open Graph and Twitter images added as static files in `src/app/` 2026-10-28)
2. Run `create-next-app` and apply the scaffold
3. GitHub rulesets and Vercel setup
4. Phase 1: Foundations

## 🐞 Bugs and known issues

| ID  | Found      | Description                                                                                                                                                                              | Severity | Status                                       |
| --- | ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | -------------------------------------------- |
| B-1 | 2026-10-26 | First-load JS on `/` is 223.6 KB gzip against the ~200 KB budget. Baseline (404 route) is 172.6 KB; landing adds ~51 KB (Motion, Base UI button, tabs and accordion, icons, next-themes) | low      | Open: ~24 KB over; owner to decide next step |

Severity: `critical` (blocks use) · `high` (feature broken) · `medium` (workaround exists) · `low` (cosmetic)

## 🧭 Decisions

Short log. Anything with real trade-offs gets a full ADR in `docs/adr/`.

| Date       | Decision                                                                                                                                                                                                          | Reference             |
| ---------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------- |
| 2026-10-31 | Pricing model: Free and Pro at $10 / month or $96 / year; limit cost, not usefulness. Paid plans not live, CTAs disabled. Pricing is the one exception to the no-plans copy rule; the free offer stays in JSON-LD | Owner, PRD §8         |
| 2026-10-31 | Atlas will have paid plans; billing in the PRD is no longer test mode only. Prices not set                                                                                                                        | Owner, PRD §4         |
| 2026-10-30 | Public pages show no build status or plans; replaces the status badges and the roadmap section decisions of 2026-10-26                                                                                            | Owner                 |
| 2026-10-27 | Visual direction from shipanysaas.com, adapted (no copied copy, logo or pricing)                                                                                                                                  | Owner                 |
| 2026-10-27 | One brand hue: violet + lavender on shadcn neutrals; replaces the no-accent rule of 2026-10-26                                                                                                                    | Owner, Design.md §2   |
| 2026-10-27 | Plus Jakarta Sans replaces Inter / Inter Tight (next/font, no npm package)                                                                                                                                        | Owner, Design.md §3   |
| 2026-10-27 | Feature explorer tabs styled as a pill grid via className; overrides the 2026-10-26 default-tabs request                                                                                                          | Owner                 |
| 2026-10-27 | Reveal stays fade and rise; no blur-in (Design.md §7 allows transform/opacity only)                                                                                                                               | Owner                 |
| 2026-10-27 | Dropped the audience and trust sections; their points moved into privacy, FAQ and how-it-works                                                                                                                    | Rebuild               |
| 2026-10-26 | "A closer look" uses the default shadcn Tabs with no extra classes; trigger height is the default 36px, below the 44px target in AGENTS.md                                                                        | Owner                 |
| 2026-10-26 | Colours are the shadcn default neutral theme with black set to #0a0a0a; no accent colours, status without colour                                                                                                  | Owner, Design.md §2   |
| 2026-10-26 | Site copy no longer calls the project open source (owner request); GitHub links stay                                                                                                                              | Owner                 |
| 2026-10-26 | Landing rebuilt as a black and white SaaS page; tabs and FAQ use `keepMounted` / `hiddenUntilFound` so all copy is in the HTML                                                                                    | Owner, rebuild brief  |
| 2026-10-26 | Roadmap shows stages 1–5, stage 5 grouping everything after stage 4                                                                                                                                               | Owner, rebuild brief  |
| 2026-10-26 | Marketing layout files moved to `src/layouts/marketing/`                                                                                                                                                          | Owner, rebuild brief  |
| 2026-10-26 | Colour scheme changed to "sea chart": teal primary, cool teal-tinted neutrals, amber kept; all pairs pass AA                                                                                                      | Owner, Design.md §2   |
| 2026-10-26 | Landing redesigned as a product-first SaaS page; capability tiles replaced by a tabbed tour                                                                                                                       | Owner, redesign       |
| 2026-10-26 | Second accent: amber "highlighter" marks passages, citations and the current stage; the primary colour stays the only action colour                                                                               | Owner, Design.md §2   |
| 2026-10-26 | Owner allowed adding shadcn components and editing `ui/` if needed for the redesign (none edited)                                                                                                                 | Owner, redesign       |
| 2026-10-26 | First-load JS budget raised from 150 KB to ~200 KB (framework baseline is ~173 KB)                                                                                                                                | Owner, landing review |
| 2026-10-26 | Mobile nav sheet lazy-loaded with `next/dynamic` on first intent                                                                                                                                                  | Owner, landing review |
| 2026-10-26 | Link buttons use `<Link className={cn(buttonVariants(...), ...)}>`, never Base UI `render`                                                                                                                        | shadcn Base UI docs   |
| 2026-10-26 | Added `motion`, `next-themes`, `schema-dts` (dev, types only) with owner approval                                                                                                                                 | Landing task          |
| 2026-10-26 | Roadmap shows PRD §4 stages as defined: 1–4 plus a grouped "5 and beyond"                                                                                                                                         | Owner, landing task   |
| 2026-10-26 | Favicon via `app/favicon.ico` file convention, no `icons` field (avoids duplicate tag)                                                                                                                            | Next.js metadata docs |
| 2026-10-26 | Next.js built-ins (`Link`, `Image`, `next/font`, `Script`) over raw elements                                                                                                                                      | AGENTS.md §5          |
| 2026-10-26 | shadcn first: no custom primitives, style via `className`, never edit `ui/`                                                                                                                                       | AGENTS.md §6          |
| 2026-10-26 | Separate repos: `atlas-ai-web` and `atlas-ai-api`                                                                                                                                                                 | ADR-0001              |
| 2026-10-26 | No Docker for the frontend; Vercel builds from Git                                                                                                                                                                | ADR-0002              |
| 2026-10-26 | `feature/*` → `integration` (squash) → `main` (merge commit), enforced by rulesets                                                                                                                                | ADR-0003              |
| 2026-10-26 | No frontend automated tests for v0.1                                                                                                                                                                              | ADR-0001              |
| 2026-10-26 | AI builds UI by default; services, hooks and auth only when explicitly asked                                                                                                                                      | AGENTS.md §2          |

## 📓 Release retrospectives

_Add one short retrospective per tagged version: what worked, what broke, what you would do
differently._
