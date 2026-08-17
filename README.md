# Atlas AI Web

Frontend application for **Atlas AI**, a long-term personal engineering and AI experimentation laboratory.

Atlas is not being developed as a startup, SaaS business, or client product. The purpose is deep learning, experimentation, architecture practice, and exploration of modern frontend engineering, AI, RAG, agents, real-time systems, and infrastructure.

The frontend communicates with the separate `atlas-ai-api` backend.

## Project Philosophy

Atlas is a **living engineering laboratory**, not a finished application.

Priorities:

1. Deep understanding over feature count.
2. Clean architecture over premature abstraction.
3. Accessibility and usability.
4. Strong TypeScript practices.
5. Clear separation of UI state and server state.
6. Explicit loading, error, empty, and success states.
7. Minimal unnecessary client-side JavaScript.
8. Progressive adoption of new technologies.
9. Maintainability over cleverness.
10. Architecture that can evolve as Atlas grows.

## Application Concept

```text
User
  ↓
Workspace
  ↓
Project
  ↓
Documents
```

Users can authenticate, create workspaces, create projects, create/edit text documents, upload documents, and eventually interact with their knowledge through RAG and AI agents.

## Technology Stack

### Current

- Next.js
- React
- TypeScript
- Tailwind CSS
- shadcn/ui
- ESLint
- Prettier

### Planned

- React Hook Form
- Zod
- TanStack Query where justified
- rich-text/editor technology
- streaming UI
- Server-Sent Events or WebSockets
- AI SDK/provider integrations
- notifications
- optimistic updates
- offline capabilities
- performance monitoring

Do not introduce all planned technologies in V1.

## Backend

The frontend communicates with:

```text
atlas-ai-api
```

The frontend must never directly access PostgreSQL, Prisma, Redis, vector databases, or internal backend services.

Expected relationship:

```text
Browser
   ↓
Next.js Web
   ↓
Atlas API
   ↓
Backend services
   ↓
Database / AI / Workers
```

## V1 Scope

### Authentication

Users can:

- sign up
- log in
- log out
- maintain an authenticated session
- refresh expired access tokens through the backend
- handle authentication errors
- redirect appropriately when unauthenticated

The refresh token is expected to be stored in an HttpOnly cookie managed by the backend.

### Workspaces

Users can:

- view workspaces
- create a workspace
- open a workspace
- rename a workspace
- delete a workspace

### Projects

Inside a workspace, users can:

- view projects
- create projects
- open projects
- edit projects
- delete projects

### Documents

Users can:

- view documents
- create text documents
- edit documents
- save documents
- delete documents
- upload supported files
- view metadata
- see processing state

The UI should support future processing states such as:

```text
Uploaded → Processing → Indexed → Ready
```

## Frontend Architecture

Prefer a feature-oriented structure:

```text
src/
├── app/
├── components/
│   ├── ui/
│   ├── layout/
│   └── shared/
├── features/
│   ├── auth/
│   ├── workspaces/
│   ├── projects/
│   └── documents/
├── lib/
│   ├── api/
│   ├── auth/
│   ├── utils/
│   └── validation/
├── hooks/
├── types/
└── config/
```

The exact structure can evolve.

## Server vs Client Components

Default to Server Components.

Use Client Components when the UI requires:

- browser APIs
- local state
- event handlers
- interactive editors
- client effects
- real-time subscriptions

Do not add `"use client"` to an entire route when only a child needs interactivity.

## API Communication

Centralize backend communication:

```text
Component
   ↓
Feature API function
   ↓
API Client
   ↓
Atlas API
```

The API layer should handle:

- base URL
- credentials/cookies
- headers
- response parsing
- error normalization
- authentication behavior
- cancellation where useful

Avoid scattering raw `fetch()` calls throughout components.

## Authentication Flow

The frontend should not periodically refresh tokens merely because a timer reached 15 minutes.

Prefer:

```text
API Request
    ↓
Access token valid?
 ├── Yes → continue
 └── No
      ↓
 /auth/refresh
      ↓
New access token
      ↓
Retry original request
```

Implement this behavior once in the API/auth layer.

## UI States

Every asynchronous feature must consider:

- Loading
- Empty
- Error
- Success
- Disabled

Do not design only the happy path.

## Forms

Forms should provide:

- typed values
- validation
- field-level errors
- submit state
- server errors
- accessible labels
- keyboard support
- duplicate-submission prevention

## Document Editor

The editor is a significant V1 feature.

It should communicate:

```text
Unsaved
Saving...
Saved
Save failed
```

It should also handle unsaved-change protection where appropriate.

Future experiments may include rich text, Markdown, slash commands, collaboration, comments, and version history.

## RAG Preparation

The document UI should be compatible with:

```text
Document
 ↓
Extraction
 ↓
Normalization
 ↓
Chunking
 ↓
Embedding
 ↓
Indexing
 ↓
Ready
```

Future AI UI may include citations, retrieved sources, streaming answers, agent progress, and tool execution.

The frontend should not be tightly coupled to one LLM provider or vector database.

## Accessibility

Use:

- semantic HTML
- keyboard navigation
- visible focus states
- accessible labels
- accessible dialogs
- accessible form errors
- logical heading hierarchy
- sufficient contrast

Use ARIA only when necessary.

## Performance

Prefer:

- Server Components
- minimal client JavaScript
- optimized images
- route-level loading UI
- dynamic imports for heavy editors
- sensible caching

Measure before optimizing.

## Security

Never expose secrets to browser code.

Never store refresh tokens in localStorage or sessionStorage.

Frontend authorization is not a security boundary. The backend remains authoritative.

Do not render untrusted HTML without appropriate sanitization.

## Future Experiments

Atlas Web can later explore:

- streaming LLM responses
- RAG citations
- AI agents
- WebSockets
- Server-Sent Events
- collaborative editing
- push notifications
- optimistic updates
- offline support
- performance monitoring
- OpenTelemetry
- edge rendering
- Kubernetes-aware deployment

## Development

```bash
npm install
npm run dev
npm run typecheck
npm run lint
npm run format
npm run format:check
npm run build
```

## Final Principle

Before adding a technology, ask:

> What problem does this solve, and what can I learn by implementing it?

The frontend is itself part of the engineering laboratory.
