# Progress: Atlas AI Web

Living status of the frontend. Update after every feature, before starting the next one.
Newest entries go at the top of each section.

**Current phase:** Phase 0: Project setup
**Current version:** unreleased (target `v0.1.0`)
**Last updated:** 2026-10-26

---

## ✅ Done

| Date       | Item                                                    | PR  | Notes                                           |
| ---------- | ------------------------------------------------------- | --- | ----------------------------------------------- |
| 2026-10-26 | Project documentation and repo configuration scaffolded | —   | AGENTS.md, docs/, CI, rulesets, tooling configs |

## 🚧 In progress

| Item                   | Branch | Started    | Notes                       |
| ---------------------- | ------ | ---------- | --------------------------- |
| Phase 0: Project setup | —      | 2026-10-26 | See `ImplementationPlan.md` |

## ⏭️ Next up

1. Run `create-next-app` and apply the scaffold
2. GitHub rulesets and Vercel setup
3. Phase 1: Foundations

## 🐞 Bugs and known issues

| ID  | Found | Description | Severity | Status |
| --- | ----- | ----------- | -------- | ------ |
| —   | —     | None yet    | —        | —      |

Severity: `critical` (blocks use) · `high` (feature broken) · `medium` (workaround exists) · `low` (cosmetic)

## 🧭 Decisions

Short log. Anything with real trade-offs gets a full ADR in `docs/adr/`.

| Date       | Decision                                                                       | Reference    |
| ---------- | ------------------------------------------------------------------------------ | ------------ |
| 2026-10-26 | Separate repos: `atlas-ai-web` and `atlas-ai-api`                              | ADR-0001     |
| 2026-10-26 | No Docker for the frontend; Vercel builds from Git                             | ADR-0002     |
| 2026-10-26 | `feature/*` → `staging` (squash) → `main` (merge commit), enforced by rulesets | ADR-0003     |
| 2026-10-26 | No frontend automated tests for v0.1                                           | ADR-0001     |
| 2026-10-26 | AI builds UI by default; services, hooks and auth only when explicitly asked   | AGENTS.md §2 |

## 📓 Release retrospectives

_Add one short retrospective per tagged version: what worked, what broke, what you would do
differently._
