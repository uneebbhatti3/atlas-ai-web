# App Flow: Atlas AI Web

Screens, routes and user journeys for v0.1. Later-stage screens are listed at the end so the
navigation is designed with room for them.

## 1. Route map

| Route                                                                   | Group    | Access      | Screen                         |
| ----------------------------------------------------------------------- | -------- | ----------- | ------------------------------ |
| `/`                                                                     | `(root)` | Public      | Landing page                   |
| `/pricing`                                                              | `(root)` | Public      | Plans, comparison, pricing FAQ |
| `/login`                                                                | `(auth)` | Guests only | Log in                         |
| `/signup`                                                               | `(auth)` | Guests only | Sign up                        |
| `/forgot-password`                                                      | `(auth)` | Guests only | Request reset email            |
| `/reset-password?token=…`                                               | `(auth)` | Guests only | Set new password               |
| `/dashboard`                                                            | `(app)`  | Signed in   | Dashboard                      |
| `/workspaces`                                                           | `(app)`  | Signed in   | Workspace list                 |
| `/workspaces/[workspaceId]`                                             | `(app)`  | Signed in   | Workspace (projects list)      |
| `/workspaces/[workspaceId]/settings`                                    | `(app)`  | Signed in   | Workspace settings             |
| `/workspaces/[workspaceId]/projects/[projectId]`                        | `(app)`  | Signed in   | Project (documents list)       |
| `/workspaces/[workspaceId]/projects/[projectId]/documents/[documentId]` | `(app)`  | Signed in   | Document view/edit             |
| `/settings/profile`                                                     | `(app)`  | Signed in   | Profile                        |
| `/settings/security`                                                    | `(app)`  | Signed in   | Password, sessions             |
| `/settings/account`                                                     | `(app)`  | Signed in   | Delete account                 |
| `not-found` / `error`                                                   | all      | —           | 404 and error boundaries       |

Guests hitting an `(app)` route go to `/login?next=<path>`. Signed-in users hitting an `(auth)`
route go to `/dashboard`.

## 2. Layouts

| Layout            | Used by  | Contents                                                                                                 |
| ----------------- | -------- | -------------------------------------------------------------------------------------------------------- |
| `MarketingLayout` | `(root)` | Translucent top nav (logo, Features, How it works, Pricing, FAQ, GitHub, Log in, Get started), footer    |
| `AuthLayout`      | `(auth)` | Centered card, logo, theme toggle; no app navigation                                                     |
| `AppShell`        | `(app)`  | Sidebar (workspaces, settings), top bar (breadcrumbs, search, user menu); collapses to a sheet on mobile |

## 3. Core journeys

### J1. First visit to first document

```
Landing ─► "Get started" ─► Sign up ─► Dashboard (empty state)
   ─► "Create your first workspace" ─► dialog ─► Workspace (empty)
   ─► "New project" ─► Project (empty) ─► "New document" ─► Document editor
```

Every empty state explains what the object is and offers exactly one primary action.

### J2. Returning user

```
/login ─► (success) ─► `next` param or /dashboard
Dashboard ─► recent project card ─► Project ─► Document
```

### J3. Password reset

```
/login ─► "Forgot password?" ─► /forgot-password ─► submit email
   ─► "Check your inbox" (same message whether or not the email exists)
   ─► email link ─► /reset-password?token ─► new password ─► /login with success notice
```

Invalid or expired token shows a clear message and a link to request a new one.

### J4. Manage a workspace

```
Workspace ─► Settings ─► rename / update description
                     ─► Archive (reversible, confirm dialog)
                     ─► Delete (irreversible, type workspace name to confirm)
```

### J5. Security

```
/settings/security ─► change password (current + new)
                  ─► sessions list (device, location if available, last active, "this device")
                  ─► revoke one session / revoke all other sessions
```

### J6. Compare plans

```
Landing ─► "Pricing" (in-page anchor) ─► "Compare all features" ─► /pricing
Any other marketing page ─► "Pricing" ─► /pricing
```

Plan CTAs read "Coming soon" and are disabled until billing is live.

## 4. Screen states

Every data-driven screen must design all of these:

| State                 | Pattern                                                                   |
| --------------------- | ------------------------------------------------------------------------- |
| Loading               | Skeletons shaped like the content (no full-page spinners)                 |
| Empty                 | Short explanation + one primary action                                    |
| Error                 | What happened, what to do, retry button; never a raw error message        |
| Not found / no access | 404-style screen; the API returns 404 for both so existence is not leaked |
| Success feedback      | Toast for background actions; inline confirmation for forms               |
| Destructive actions   | Confirmation dialog; delete requires typing the name                      |

## 5. Navigation rules

- Breadcrumbs mirror the hierarchy: Workspace › Project › Document.
- The sidebar lists workspaces; the current one is highlighted.
- URLs are the source of truth for selection. Do not keep "current workspace" in Zustand.
- Back/forward must always work; dialogs that represent a resource may use intercepting routes.

## 6. Reserved for later stages

| Stage | Screens to reserve space for                                            |
| ----- | ----------------------------------------------------------------------- |
| 2     | Upload dialog with progress, processing status badges, failed-job retry |
| 3     | Search results page with filters and source snippets                    |
| 4     | AI conversation panel with streaming answers and citations              |
| 5+    | Reports, agent runs, notifications inbox, members, billing and usage    |
| Later | Billing (plan, usage meters, upgrade) and Settings → API keys           |
