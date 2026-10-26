# Lab Rules

How the owner works on Atlas AI. These rules exist because the project's purpose is deep
learning, not shipping speed. `AGENTS.md` governs AI tools; this file governs the human.

## 1. AI usage boundary

| Area                                                       | AI use                                     |
| ---------------------------------------------------------- | ------------------------------------------ |
| Frontend UI (components, styling, layout, animation)       | Allowed                                    |
| Frontend services, API hooks, auth client, API types       | Only when I explicitly ask                 |
| Backend (`atlas-ai-api`): code, database, infrastructure   | **Not allowed.** Written by hand           |
| Documentation files, email templates, UI refinement        | Allowed                                    |
| Lab notebook entries, ADR "What I learned", retrospectives | Written by me (AI may polish wording only) |

## 2. When I get stuck

| Problem type                           | Solo time-box | Then escalate to                                                 |
| -------------------------------------- | ------------- | ---------------------------------------------------------------- |
| Core logic and design problems         | Up to 1 day   | Docs → library source → GitHub issues → community forums/Discord |
| Tooling, config and environment issues | 2–3 hours     | Same ladder                                                      |

Write down hypotheses while stuck. Record the resolution in `docs/MEMORY.md` → Gotchas.

## 3. AI code review protocol

- Only after a feature is complete and checks pass. Never mid-debugging.
- AI answers in text only, as questions or named concepts ("What happens if two requests do X
  at once?", "look into idempotency here"). No code and no step-by-step fixes.
- Every finding is a claim to verify against the docs, not a verdict.
- Review checklist: authorization and data isolation · concurrency and transactions · error
  handling · query efficiency (N+1, indexes) · input validation · test coverage.

## 4. Finish lines

- Each phase in `ImplementationPlan.md` has a "done when". Do not start the next phase early.
- Tag a version at each milestone and write a short retrospective in `PROGRESS.md`.
