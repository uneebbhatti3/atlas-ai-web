# Design System: Atlas AI Web

Apple-inspired: clean, minimal and modern, with generous whitespace, bold type, subtle blur and
soft motion. This file holds the **exact values**. Components must use these tokens, never
hardcoded values.

## 1. Principles

1. **Content first.** Chrome recedes; the user's knowledge is the hero.
2. **One primary action per view.** Everything else is secondary or tertiary.
3. **Depth through material, not decoration.** Translucency and blur for layers that float
   (nav, sheets, popovers); flat surfaces everywhere else.
4. **Motion explains, never performs.** Animate state changes and spatial relationships only.
5. **Accessible by default.** Contrast, focus and target size are not polish; they ship on day one.

Note: the apple-design skill is written for native platforms. On the web, apply its principles
but keep web conventions (top navigation, links that look like links, no iOS tab bar on desktop).

## 2. Color tokens

Defined as CSS variables in `src/app/globals.css` and mapped to Tailwind theme names
(shadcn/ui conventions). Values are hex for readability; convert to OKLCH in CSS if preferred.

| Token                  | Light                    | Dark                  | Use                                                         |
| ---------------------- | ------------------------ | --------------------- | ----------------------------------------------------------- |
| `--background`         | `#FBFBFD`                | `#000000`             | Page background                                             |
| `--surface`            | `#FFFFFF`                | `#1C1C1E`             | Cards, panels                                               |
| `--surface-secondary`  | `#F5F5F7`                | `#2C2C2E`             | Sidebars, inset areas, hover                                |
| `--foreground`         | `#1D1D1F`                | `#F5F5F7`             | Primary text                                                |
| `--muted-foreground`   | `#6E6E73`                | `#A1A1A6`             | Secondary text, captions                                    |
| `--border`             | `#D2D2D7`                | `#38383A`             | Decorative hairlines, card edges, dividers                  |
| `--input`              | `#86868B`                | `#7C7C80`             | Input, checkbox and switch outlines (3:1 for UI components) |
| `--primary`            | `#0071E3`                | `#2997FF`             | Primary buttons, links, focus                               |
| `--primary-foreground` | `#FFFFFF`                | `#000000`             | Text on primary                                             |
| `--destructive`        | `#D70015`                | `#FF453A`             | Delete, errors                                              |
| `--success`            | `#1D7F3A`                | `#30D158`             | Success text and icons                                      |
| `--warning`            | `#B25000`                | `#FF9F0A`             | Warnings                                                    |
| `--ring`               | `#0071E3`                | `#2997FF`             | Focus ring                                                  |
| `--glass`              | `rgba(255,255,255,0.72)` | `rgba(22,22,23,0.72)` | Translucent bars                                            |

Contrast notes:

- Apple's familiar bright green (`#34C759`) and orange (`#FF9500`) **fail** WCAG AA as text on
  white. The light-theme values above are darkened so status text passes 4.5:1.
- `--muted-foreground` on `--background` passes AA for body text in both themes (4.9:1 light);
  do not go lighter.
- `--border` is decorative and too faint (1.5:1) to be the only boundary of an interactive
  control. Inputs, checkboxes and switches use `--input`, which meets the 3:1 rule for UI
  components.
- Primary blue on white is 4.7:1, so it is valid for link text and white-on-blue buttons.

## 3. Typography

| Role           | Font           | Weight | Size / line height          | Tracking |
| -------------- | -------------- | ------ | --------------------------- | -------- |
| Display (hero) | Inter Tight    | 700    | 56/60 desktop, 40/44 mobile | -0.03em  |
| H1             | Inter Tight    | 700    | 40/44 desktop, 32/36 mobile | -0.025em |
| H2             | Inter Tight    | 600    | 28/34                       | -0.02em  |
| H3             | Inter          | 600    | 21/28                       | -0.01em  |
| Body large     | Inter          | 400    | 19/30                       | 0        |
| Body           | Inter          | 400    | 16/24                       | 0        |
| Small          | Inter          | 400    | 14/20                       | 0        |
| Caption        | Inter          | 500    | 12/16                       | 0.01em   |
| Mono           | JetBrains Mono | 400    | 14/22                       | 0        |

- Load fonts with `next/font` (self-hosted, no layout shift).
- Bold, tight headlines and calm body text are what make the style feel "Apple". Keep body
  text at 16 px minimum and line length at 60–75 characters.

## 4. Spacing and layout

- 4 px base grid. Common steps: 4, 8, 12, 16, 24, 32, 48, 64, 96, 128.
- Landing sections: 96–128 px vertical padding desktop, 64 px mobile.
- App content padding: 24 px desktop, 16 px mobile.
- Max widths: marketing text `980px`, marketing wide `1200px`, app content `1280px`,
  reading view `720px`.
- Breakpoints: Tailwind defaults (`sm 640`, `md 768`, `lg 1024`, `xl 1280`, `2xl 1536`).
- Sidebar: 260 px expanded, 72 px collapsed; becomes a sheet below `lg`.

## 5. Radius, borders and elevation

| Token           | Value  | Use                           |
| --------------- | ------ | ----------------------------- |
| `--radius-sm`   | 8px    | Inputs, small buttons, badges |
| `--radius-md`   | 12px   | Buttons, menus                |
| `--radius-lg`   | 18px   | Cards, dialogs                |
| `--radius-xl`   | 24px   | Feature tiles, hero media     |
| `--radius-full` | 9999px | Pills, avatars                |

- Borders: 1px `--border`; prefer hairlines over shadows inside the app.
- Shadows (light theme only; dark uses surface contrast instead):
  - `--shadow-sm`: `0 1px 2px rgba(0,0,0,0.04)`
  - `--shadow-md`: `0 4px 16px rgba(0,0,0,0.06)`
  - `--shadow-lg`: `0 12px 40px rgba(0,0,0,0.10)` (dialogs, popovers)

## 6. Materials (blur)

| Surface              | Background                            | Blur                                         |
| -------------------- | ------------------------------------- | -------------------------------------------- |
| Top nav, app top bar | `--glass`                             | `backdrop-filter: saturate(180%) blur(20px)` |
| Sheets, popovers     | `--surface` at 85%                    | `blur(24px)`                                 |
| Dialog overlay       | `rgba(0,0,0,0.32)` light / `0.6` dark | `blur(4px)`                                  |

Always provide a solid fallback (`@supports not (backdrop-filter: blur(1px))`), and disable blur
when `prefers-reduced-transparency: reduce`.

## 7. Motion

| Token             | Value                                             | Use                            |
| ----------------- | ------------------------------------------------- | ------------------------------ |
| `--duration-fast` | 150ms                                             | Hover, press, toggles          |
| `--duration-base` | 250ms                                             | Menus, popovers, tabs          |
| `--duration-slow` | 400ms                                             | Dialogs, sheets, page sections |
| `--ease-standard` | `cubic-bezier(0.25, 0.1, 0.25, 1)`                | Default                        |
| `--ease-out`      | `cubic-bezier(0.16, 1, 0.3, 1)`                   | Entrances                      |
| Spring (Framer)   | `{ type: "spring", stiffness: 300, damping: 30 }` | Layout and drag                |

Landing page:

- Fade and rise on scroll (`opacity 0→1`, `y 24→0`, `--duration-slow`, `--ease-out`), once.
- Stagger children by 60–80 ms; never animate more than one hero element at a time.

Rules:

- Wrap motion with `useReducedMotion()`; reduced motion swaps movement for opacity only.
- Never animate layout properties that cause reflow in long lists; use `transform`/`opacity`.

## 8. Components

| Component          | Spec                                                                                             |
| ------------------ | ------------------------------------------------------------------------------------------------ |
| Primary button     | `--primary` fill, `--radius-md`, height 44px (40px dense in app tables), weight 500              |
| Secondary button   | `--surface-secondary` fill, `--foreground` text                                                  |
| Ghost button       | Transparent; hover `--surface-secondary`                                                         |
| Pill CTA (landing) | `--radius-full`, height 48px, padding 0 24px                                                     |
| Input              | Height 44px, `--radius-sm`, 1px `--input`, focus ring 2px `--ring` with 2px offset               |
| Card               | `--surface`, 1px `--border`, `--radius-lg`, padding 24px; hover lifts with `--shadow-md` (light) |
| Dialog             | `--radius-lg`, max width 480px (forms) / 640px (content), `--shadow-lg`                          |
| Badge              | `--radius-full`, caption type, tinted background at 12% of the status color                      |
| Skeleton           | `--surface-secondary` with a soft shimmer; respects reduced motion                               |
| Icons              | Lucide, 1.75 stroke, 16px inline / 20px buttons / 24px empty states                              |

## 9. Accessibility checklist

- Text contrast AA (4.5:1 body, 3:1 large text and UI components).
- Visible focus ring on every interactive element; never `outline: none` without a replacement.
- Hit targets at least 44×44 px.
- Every icon-only button has an `aria-label`.
- Forms: labels always visible (no placeholder-only labels), errors announced via `aria-live`.
- Respect `prefers-reduced-motion`, `prefers-reduced-transparency` and `prefers-color-scheme`.

## 10. Review screenshots

After every UI change, capture with Playwright:

| Viewport | Size       |
| -------- | ---------- |
| Mobile   | 390 × 844  |
| Desktop  | 1440 × 900 |

Both in light and dark themes, then run the apple-design review and fix its findings.
