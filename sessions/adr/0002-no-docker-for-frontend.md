# ADR-0002: No Docker image for the frontend

|        |            |
| ------ | ---------- |
| Status | Accepted   |
| Date   | 2026-10-26 |

## Context

The original plan was to build and update a Docker image on every push to `main`. The frontend
is hosted on Vercel, which builds directly from the Git repository and does not run Docker
images.

## Options considered

1. **Build and push an image to GHCR anyway** — portable artifact and Docker practice, but
   nothing would run it, and it adds CI time and maintenance for no runtime benefit.
2. **Self-host the frontend from Docker** — real Docker practice, but gives up Vercel's previews
   and edge network, and duplicates infrastructure work better done on the backend.
3. **No Docker for the frontend** — Vercel handles builds and deploys.

## Decision

No Docker for the frontend. Docker, image registries and container deployment are learned on
`atlas-ai-api`, where they solve real problems (API, workers, PostgreSQL, Redis).

## Consequences

- One less pipeline to maintain in this repo.
- If the frontend ever moves off Vercel, add a Dockerfile using Next.js `output: "standalone"`.

## What I learned

_Fill in later._
