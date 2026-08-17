# Atlas AI Web — Project Requirements

## 1. Purpose

Atlas AI Web is the Next.js frontend for Atlas AI, a long-term personal engineering laboratory.

The frontend is optimized for learning, experimentation, architectural depth, accessibility, performance, and extensibility—not monetization or rapid shipping.

## 2. V1 Core

```text
User
 ↓
Workspace
 ↓
Project
 ↓
Documents
```

The document system becomes the foundation for the future RAG system.

## 3. Authentication

### Sign Up

Fields:

- name
- email
- password
- password confirmation

Requirements:

- validation
- field-level errors
- loading state
- success/error state
- redirect after success

### Login

Requirements:

- email/password form
- validation
- invalid credential handling
- network error handling
- loading state
- redirect after success

### Logout

Call the backend logout endpoint and clear client authentication state.

### Session Restoration

The frontend should restore authentication without exposing refresh tokens to JavaScript.

Expected behavior:

```text
Application
 ↓
Existing access/session?
 ↓
If required → refresh through backend
 ↓
Authenticated application or login
```

## 4. Workspaces

Users can:

- list workspaces
- create a workspace
- open a workspace
- rename a workspace
- delete a workspace

Deletion requires explicit confirmation.

Initial membership may contain only the owner, but the UI must not assume this will always be true.

## 5. Projects

Inside a workspace users can:

- list projects
- create projects
- open projects
- edit projects
- delete projects

Project fields:

- name
- description

Hierarchy:

```text
Workspace
 └── Projects
      └── Documents
```

## 6. Documents

Documents are the primary V1 domain feature.

Users can:

- list documents
- create text documents
- edit documents
- save documents
- delete documents
- upload documents
- view metadata
- see processing state

Possible states:

```text
DRAFT
UPLOADING
PROCESSING
READY
FAILED
```

## 7. Text Documents

Minimum fields:

```text
Title
Content
Visibility
```

The editor must communicate:

```text
Unsaved
Saving...
Saved
Save failed
```

Support:

- create
- edit
- save
- cancel
- delete

Protect against accidental loss of unsaved changes where appropriate.

## 8. Uploaded Documents

Initial candidates:

- PDF
- Markdown
- TXT
- DOCX

Upload flow:

```text
Select
 ↓
Validate
 ↓
Upload
 ↓
Processing
 ↓
Ready / Failed
```

Handle:

- invalid file type
- excessive file size
- upload errors
- progress where practical
- cancellation where practical
- retry where practical

Upload completion does not necessarily mean RAG indexing is complete.

## 9. Document Detail

A document page should show:

- title
- type
- status
- updated time
- content/preview
- actions

Future versions may show extracted content, chunks, citations, and indexing information.

## 10. Navigation

V1 should establish a predictable dashboard layout containing access to:

- workspaces
- projects
- documents
- account/session actions

It must work on desktop and mobile.

## 11. Required UI States

Every asynchronous feature must define:

```text
Loading
Empty
Error
Success
Disabled
```

Examples:

```text
No workspaces yet.
Create your first workspace.
```

```text
No documents yet.
Create or upload a document.
```

## 12. API Integration

Use:

```text
UI
 ↓
Feature API
 ↓
Central API Client
 ↓
atlas-ai-api
```

The API client should centralize:

- base URL
- credentials
- headers
- response parsing
- errors
- auth refresh
- cancellation

## 13. Authentication Token Handling

The frontend must not store refresh tokens in localStorage or sessionStorage.

Expected flow:

```text
Request
 ↓
Access token valid?
 ├── Yes → response
 └── No
      ↓
POST /auth/refresh
      ↓
New access token
      ↓
Retry original request
```

This behavior belongs in the API/auth layer, not individual components.

## 14. Component Architecture

Use:

```text
UI primitives
Shared components
Feature components
Page composition
```

Example:

```text
components/ui/
components/shared/
features/workspaces/components/
features/projects/components/
features/documents/components/
```

Avoid giant components and unnecessary abstractions.

## 15. Server/Client Components

Default to Server Components.

Use Client Components for:

- editors
- interactive dialogs
- interactive forms
- drag/drop upload
- browser APIs
- real-time UI
- client effects

## 16. Forms

Forms must support:

- validation
- field errors
- server errors
- submit state
- accessible labels
- keyboard support
- duplicate-submission prevention

## 17. RAG Preparation

V1 does not need a complete RAG UI, but it must support future states:

```text
Uploaded
 ↓
Extracting
 ↓
Chunking
 ↓
Embedding
 ↓
Indexing
 ↓
Ready
```

Future features:

- processing progress
- indexing errors
- retry
- citations
- source previews
- retrieval results

## 18. Future AI UI

Later versions may include:

```text
Question
 ↓
RAG Retrieval
 ↓
LLM / Agent
 ↓
Streaming Answer
 ↓
Citations
```

Support eventually:

- streaming
- citations
- retrieved sources
- tool calls
- agent status
- cancellation
- multimodal input

## 19. Notifications

Future UI channels:

- in-app
- push
- WebSocket
- SSE
- email

Potential events:

- document processing completed
- AI task completed
- agent failed
- workspace event

## 20. Responsive Design

Support:

- desktop
- tablet
- mobile

Pay special attention to the document editor, navigation, dialogs, and uploads.

## 21. Accessibility

Support:

- keyboard navigation
- screen readers
- semantic HTML
- visible focus
- accessible dialogs
- accessible form errors
- logical headings

## 22. Performance

Prioritize:

- Server Components
- minimal client JS
- optimized images
- route loading states
- dynamic imports for heavy editors
- sensible caching

Do not add complex performance infrastructure without measuring.

## 23. Security

The frontend must:

- never expose secrets
- never store refresh tokens in browser storage
- treat API data as untrusted
- safely render user-generated content
- rely on backend authorization

## 24. V1 Definition of Done

The complete V1 flow is:

```text
Sign Up
   ↓
Login
   ↓
Dashboard
   ↓
Create Workspace
   ↓
Open Workspace
   ↓
Create Project
   ↓
Open Project
   ↓
Create Text Document
   ↓
Edit Document
   ↓
Save Document
   ↓
Upload Document
   ↓
View Documents
   ↓
Manage/Delete Documents
```

Authentication refresh should work without forcing unnecessary re-login when the access token expires.

Every important asynchronous interaction must have proper loading, empty, error, success, and disabled states.

The goal is deep understanding, not maximum feature count.
