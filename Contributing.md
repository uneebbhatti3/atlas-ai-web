# Contributing

Atlas AI is a solo learning lab, but it follows a team-grade workflow on purpose.

## Branches

| Branch                                                  | Purpose                      | Deploys to             |
| ------------------------------------------------------- | ---------------------------- | ---------------------- |
| `main`                                                  | Production                   | Vercel production      |
| `staging`                                               | Integration (default branch) | Vercel staging preview |
| `feature/*`, `fix/*`, `chore/*`, `docs/*`, `refactor/*` | Work in progress             | PR previews            |

Nobody pushes directly to `main` or `staging`. Both are protected by GitHub rulesets.

## Workflow

```bash
git switch staging && git pull
git switch -c feature/workspace-list
# ...work, commit...
git push -u origin feature/workspace-list
```

1. Open a PR into **`staging`**. The title must follow Conventional Commits.
2. CI must pass: `Quality checks`, `Branch flow`, `PR title`.
3. **Squash and merge.** The PR title becomes the commit on `staging`.
4. Check the staging deployment.
5. To release, open a PR from **`staging` into `main`** and **merge** it with a merge commit
   (never squash; see `docs/adr/0003-branching-model.md`).

## Commit messages

[Conventional Commits](https://www.conventionalcommits.org/), checked by commitlint:

```
feat(workspaces): add create workspace dialog
fix(auth): redirect to next param after login
docs(adr): record cookie strategy decision
```

Types: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`, `chore`,
`revert`. Keep the subject under 72 characters where possible.

## Before opening a PR

- `npm run check` and `npm run build` pass.
- UI changes reviewed on mobile and desktop, light and dark.
- `docs/PROGRESS.md` and `docs/MEMORY.md` updated.
- Fill in the PR template.
