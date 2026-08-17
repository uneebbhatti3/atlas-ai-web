# CLAUDE.md — Atlas AI Web Engineering Instructions

## Project Context

This repository is the Next.js frontend for Atlas AI, a long-term engineering and AI experimentation laboratory.

Priorities:

- learning
- correctness
- accessibility
- maintainability
- performance
- extensibility

Do not optimize for commercial requirements or rapid shipping.

## Stack

- Next.js
- React
- TypeScript
- Tailwind CSS
- shadcn/ui
- ESLint
- Prettier

Future libraries should be introduced only when a real requirement justifies them.

## Next.js

Use the App Router.

Prefer Server Components.

Use Client Components only for:

- browser APIs
- local state
- event handlers
- interactive editors
- effects
- real-time subscriptions

Do not add `"use client"` unnecessarily.

## Architecture

Prefer:

```text
src/
├── app/
├── components/
│   ├── ui/
│   ├── shared/
│   └── layout/
├── features/
│   ├── auth/
│   ├── workspaces/
│   ├── projects/
│   └── documents/
├── lib/
│   ├── api/
│   ├── auth/
│   ├── validation/
│   └── utils/
├── hooks/
├── types/
└── config/
```

Keep business/domain behavior out of purely presentational components.

## Backend Boundary

The frontend communicates with `atlas-ai-api`.

Never access PostgreSQL, Prisma, Redis, vector databases, or internal workers directly from the browser.

Use:

```text
UI
 ↓
Feature API
 ↓
Central API Client
 ↓
Atlas API
```

Avoid scattered raw fetch calls.

## Authentication

The backend owns authentication.

Refresh tokens must not be stored in localStorage or sessionStorage.

Expected behavior:

```text
API request
 ↓
Access token valid?
 ├── Yes → continue
 └── No
      ↓
   /auth/refresh
      ↓
 New access token
      ↓
 Retry request
```

Implement this once in the API/auth layer.

## Authorization

Frontend route guards are UX mechanisms, not security boundaries.

The backend remains authoritative for workspace, project, and document access.

## API Errors

Normalize API errors.

Handle appropriately:

- 400 validation
- 401 authentication
- 403 authorization
- 404 not found
- 409 conflict
- 429 rate limiting
- 5xx server errors
- network failures

Never expose raw stack traces.

## State

Distinguish UI state from server state.

UI state includes dialogs, selected items, editor state, and forms.

Server state includes workspaces, projects, documents, and sessions.

Do not introduce global state unless there is a genuine need.

## Forms

Forms must have:

- validation
- field errors
- submit state
- server errors
- accessible labels
- keyboard support
- duplicate-submission prevention

## UI States

Every async feature must support:

```text
Loading
Empty
Error
Success
Disabled
```

## Documents

Documents are a core V1 feature.

Support:

- creation
- editing
- saving
- deletion
- upload
- metadata
- processing status

The editor should communicate:

```text
Unsaved
Saving...
Saved
Save failed
```

## RAG

Future flow:

```text
Document
 ↓
Extract
 ↓
Normalize
 ↓
Chunk
 ↓
Embed
 ↓
Index
 ↓
Ready
```

Keep the frontend independent from the specific LLM provider and vector database.

## AI UI

Future interfaces may include:

- streaming responses
- citations
- retrieved sources
- agent progress
- tool execution
- cancellation
- multimodal input

Design the application shell so these can be introduced incrementally.

## Accessibility

Prefer semantic HTML.

Support keyboard navigation, visible focus, accessible labels, dialogs, errors, and logical heading structure.

Use ARIA only when needed.

## Performance

Prefer:

- Server Components
- minimal Client Components
- optimized images
- dynamic imports for heavy editors
- route-level loading states
- measured caching

Do not introduce complex optimization without evidence.

## Styling

Use the project's Tailwind and shadcn/ui conventions.

Prefer existing design-system primitives over one-off replacements.

## Testing

Prioritize behavior tests for:

- authentication
- forms
- document editing
- uploads
- API errors
- critical navigation
- loading/error states

## Change Discipline

Before changing code:

1. Read the relevant implementation.
2. Follow existing conventions.
3. Reuse existing components where appropriate.
4. Make the smallest coherent change.
5. Test it.
6. Run type checking.
7. Run linting.
8. Format.
9. Build when appropriate.

Avoid unrelated refactors.

## Final Rule

Before adding a library, abstraction, state manager, or rendering strategy, ask:

> What problem does this solve, and what can I learn by implementing it?
