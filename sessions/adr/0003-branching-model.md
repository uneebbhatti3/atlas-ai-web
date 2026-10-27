# ADR-0003: Branching model and merge protection

|        |            |
| ------ | ---------- |
| Status | Accepted   |
| Date   | 2026-10-26 |

> **Amended 2026-10-27:** the integration branch was renamed from `staging` to `integration`.
> The model is unchanged.

## Context

Work should be integrated and checked on an integration branch before reaching production, and
nobody (including the owner and AI agents) should be able to push directly to `main`.

## Decision

```
feature/* | fix/* | chore/* | docs/* | refactor/*
      │  PR, squash merge, checks must pass
      ▼
   integration  ──► Vercel integration deployment
      │  PR from integration only, merge commit, checks must pass
      ▼
   main         ──► Vercel production deployment
```

Enforcement, strongest first:

1. **GitHub rulesets** (`.github/rulesets/*.json`) on `main` and `integration`: pull request
   required, required status checks, no force-push, no deletion, no bypass actors.
2. **Required checks:** `Quality checks` (format, lint, typecheck, build), `Branch flow`
   (only `integration` may merge into `main`), `PR title` (Conventional Commits, `integration` only).
3. **Local Husky `pre-push` hook** — fast feedback; can be skipped with `--no-verify`, which is
   why the rulesets are the real guard.

`integration` is the repository's default branch so new PRs target it automatically.

## Consequences

- Required approvals are set to 0: GitHub does not let you approve your own PR, so requiring one
  would block a solo developer. Checks are the gate instead.
- Merge methods differ on purpose. Squashing `integration` into `main` would create commits on
  `main` that `integration` lacks, and the branches would drift. Merge commits keep them aligned.
- Each `integration → main` merge adds one merge commit to `main` that `integration` does not have.
  It carries no file changes, so it never causes conflicts, but it means `integration` is always
  technically "behind" `main`. For that reason the `main` ruleset does **not** require the
  branch to be up to date before merging; otherwise every release PR would demand an update
  that the `integration` ruleset forbids pushing. The `integration` ruleset does require feature
  branches to be up to date.
- Hotfixes still go through `integration`. Acceptable for a lab; a `hotfix/*` → `main` path can be
  added later if needed.
- Rulesets are free only on public repositories (or paid plans for private ones).

## What I learned

_Fill in after the first integration → main release._
