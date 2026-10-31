# Product Requirements: Atlas AI Web

|              |                                                |
| ------------ | ---------------------------------------------- |
| Repository   | `atlas-ai-web` (frontend)                      |
| Companion    | `atlas-ai-api` (NestJS backend, separate repo) |
| Status       | Draft v0.1                                     |
| Last updated | 2026-10-26                                     |

## 1. What Atlas AI is

Atlas AI is a knowledge and research workspace. Users organize information as
**User → Workspace → Project → Documents**, and over time those documents become a searchable
knowledge base that supports semantic search, question answering with citations, research
reports and AI agents.

## 2. Why it exists

Atlas AI is a **personal engineering lab**, not a startup. Its purpose is to build deep,
practical skill in designing, building, debugging and operating production-quality software.
There are no revenue targets and no launch deadline. The repository is public and will be
shared on LinkedIn, so anyone may explore it or run it.

Two consequences shape every requirement below:

1. **Quality over speed.** Features are built to production standards (accessibility, error
   handling, loading states, security) even though usage will be small.
2. **The frontend serves the backend learning.** The web app is the window into the backend.
   It should make backend behavior visible (processing states, job progress, errors) rather
   than hide it.

## 3. Users

| User                          | Need                                                                                                  |
| ----------------------------- | ----------------------------------------------------------------------------------------------------- |
| The owner (primary)           | Manage personal research and engineering knowledge; exercise every backend feature through a real UI. |
| Visitors from LinkedIn/GitHub | Understand what Atlas is in seconds from the landing page; optionally sign up to a guarded demo.      |

## 4. Scope by stage

The full product vision has eight stages (see the project specification). The frontend follows
the backend, one stage at a time.

### v0.1 — Stage 1: Knowledge organization (current target)

| ID   | Requirement                                                                             | Priority |
| ---- | --------------------------------------------------------------------------------------- | -------- |
| F-01 | Landing page that explains Atlas AI, its lab nature and links to GitHub                 | Must     |
| F-02 | Sign up, log in, log out                                                                | Must     |
| F-03 | Forgot password and reset password flow                                                 | Must     |
| F-04 | Protected app routes; unauthenticated users are redirected to login                     | Must     |
| F-05 | Dashboard showing recent workspaces and projects                                        | Must     |
| F-06 | Workspaces: create, list, view, rename, update details, archive, delete                 | Must     |
| F-07 | Projects inside a workspace: create, list, view, edit, archive, delete                  | Must     |
| F-08 | Documents inside a project: create (plain text/Markdown), list, view, rename, delete    | Must     |
| F-09 | Account settings: profile, change password, active sessions with revoke, delete account | Must     |
| F-10 | Light and dark theme                                                                    | Must     |
| F-11 | Responsive layout from 360 px to wide desktop                                           | Must     |
| F-12 | Global search for workspaces/projects/documents by title                                | Should   |
| F-13 | Command palette (⌘K) for navigation                                                     | Could    |

### Later stages (not in v0.1)

- **Stage 2:** file uploads with progress, document processing status (pending, processing,
  ready, failed), retry failed processing.
- **Stage 3:** full-text and semantic search results with source attribution.
- **Stage 4:** AI conversations with streamed answers and citations.
- **Stage 5+:** research reports, agents, collaboration, notifications, billing and paid plans,
  usage dashboards, mobile app (Flutter, separate repo).

## 5. Non-goals for v0.1

- No real payments or production billing (paid plans come in a later stage).
- No collaboration, invitations or roles.
- No file uploads or AI features.
- No frontend automated tests (decision recorded; see `docs/adr/0001-frontend-stack.md`).
- No offline support.

## 6. Success criteria for v0.1

- Every F-01 to F-11 requirement works against the real backend (not mocks).
- Every data view has loading, empty and error states.
- Lighthouse accessibility score of 95 or higher on landing, login and dashboard.
- No `any` in the codebase; lint, typecheck and build pass in CI on every PR.
- The owner can explain every data-flow path from a button click to the database and back.

## 7. Constraints

- Authentication uses **Better Auth**; the backend owns sessions and authorization.
- A user can only see workspaces, projects and documents they are authorized for. The frontend
  never assumes access; it renders what the API returns and handles 401/403/404 correctly.
- Public repo: no secrets in code, and any public demo must have usage limits (decided later).

## 8. Plans and pricing

Principle: **limit cost, not usefulness.** Limits sit on what costs money to run (storage,
processing, AI usage), never on organizing your own knowledge. Citations and data export are on
every plan.

**Paid plans are not live yet.** Every plan CTA reads "Coming soon"; there is no checkout.

Pro costs $10 / month, or $96 / year (shown as $8 / month, billed yearly). Currency is USD. A
Team plan with shared workspaces is mentioned only as coming later.

| Feature                     | Free                    | Pro                            |
| --------------------------- | ----------------------- | ------------------------------ |
| Workspaces                  | 1                       | 3                              |
| Projects                    | Unlimited               | Unlimited                      |
| Documents                   | Unlimited               | Unlimited                      |
| Storage                     | 1 GB                    | 50 GB                          |
| Max file size               | 40 MB                   | 1 GB                           |
| Pages processed per month   | 1,000                   | 25,000                         |
| AI questions (Ask Atlas)    | 50 / month              | 1,000 / month (fair use)       |
| Research reports            | 2 / month               | 30 / month                     |
| Semantic and keyword search | Included (rate-limited) | Included                       |
| Citations on every answer   | Included                | Included                       |
| AI model                    | Standard                | Advanced                       |
| Use your own API key        | Chat and reports        | Chat, reports and model choice |
| Document processing         | Standard queue          | Priority queue                 |
| Conversation history        | 30 days                 | Unlimited                      |
| Export your data            | Included                | Included                       |
| AI agents                   | —                       | Coming later                   |
| Integrations                | —                       | Coming later                   |

Own-key rules: questions and reports use the user's own provider key and are not limited by plan
quotas. Storage, file size and page limits still apply. Indexing always uses Atlas's own model so
search stays consistent.

On downgrade, extra workspaces become read-only and nothing is deleted.

`src/features/pricing/data/plans.ts` holds these values for the website; keep the two in step.
