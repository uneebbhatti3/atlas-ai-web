<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Atlas AI Web — Agent Instructions

## Repository Purpose

This is the Next.js frontend for Atlas AI, a long-term engineering and AI experimentation laboratory.

Prioritize learning value, correctness, accessibility, maintainability, performance, and extensibility.

## Stack

- Next.js
- React
- TypeScript
- Tailwind CSS
- shadcn/ui
- ESLint
- Prettier

Do not introduce libraries without a concrete reason.

## Next.js

Use the App Router.

Prefer Server Components.

Use Client Components only when required for interactivity, browser APIs, local state, editors, effects, or real-time subscriptions.

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

## Backend Communication

The frontend communicates with `atlas-ai-api`.

Never access the database directly.

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

Avoid arbitrary fetch calls scattered throughout components.

## Authentication

Refresh tokens must not be stored in localStorage or sessionStorage.

The backend owns refresh-token verification and rotation.

Expected flow:

```text
API request
 ↓
Access token valid?
 ├── Yes → continue
 └── No → refresh
             ↓
        new access token
             ↓
        retry request
```

Implement refresh handling centrally.

## Authorization

Frontend route guards are not security boundaries.

The backend remains authoritative for resource access.

## UI States

Every asynchronous feature should support:

```text
Loading
Empty
Error
Success
Disabled
```

## Forms

Forms must include validation, field errors, server errors, submit state, accessible labels, keyboard support, and duplicate-submission prevention.

## Documents

Support:

- text creation
- editing
- saving
- deletion
- uploads
- metadata
- processing status

Communicate:

```text
Unsaved
Saving...
Saved
Save failed
```

## RAG Preparation

Keep the UI compatible with:

```text
Upload
 ↓
Extract
 ↓
Chunk
 ↓
Embed
 ↓
Index
 ↓
Ready
```

Do not couple the UI to a specific LLM or vector database.

## Security

Never expose secrets.

Never store refresh tokens in browser storage.

Never treat frontend authorization as sufficient.

Safely render user-generated content.

## Accessibility

Use semantic HTML, keyboard navigation, visible focus, accessible labels, accessible dialogs, accessible errors, and logical headings.

## Performance

Prefer Server Components, minimal client JavaScript, optimized images, dynamic imports for heavy components, and measured caching.

## Testing

Prioritize behavior tests for authentication, forms, documents, uploads, API errors, navigation, and async UI states.

## Change Discipline

Before changing code:

1. Read the relevant code.
2. Follow existing patterns.
3. Reuse components where appropriate.
4. Make the smallest coherent change.
5. Test.
6. Type-check.
7. Lint.
8. Format.
9. Build when appropriate.

Avoid unrelated refactors.

## Agent Rule

The Next.js-generated instructions at the beginning of this file remain authoritative for Next.js-specific behavior.

When uncertain about a current Next.js API, inspect the installed Next.js documentation under `node_modules/next/dist/docs/` before implementing it.
