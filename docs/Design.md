# Design System: Atlas AI Web

Restrained, clean, minimal and modern, with generous whitespace, bold type, subtle blur and
soft motion, in black and white (§2). This file holds the **exact values**. Components must use
these tokens, never hardcoded values.

## 1. Principles

1. **Content first.** Chrome recedes; the user's knowledge is the hero.
2. **One primary action per view.** Everything else is secondary or tertiary.
3. **Depth through material, not decoration.** Translucency and blur for layers that float
   (nav, sheets, popovers); flat surfaces everywhere else.
4. **Motion explains, never performs.** Animate state changes and spatial relationships only.
5. **Accessible by default.** Contrast, focus and target size are not polish; they ship on day one.

Keep web conventions: top navigation, links that look like links, no mobile tab bar on desktop.

## 2. Color tokens

Defined as CSS variables in `src/app/globals.css` and mapped to Tailwind theme names. Neutrals are
the **shadcn/ui default neutral theme** with black set to `#0A0A0A`; on top sits **one brand
hue**: violet for brand moments and lavender for panels and the headline highlight block. The
direction comes from shipanysaas.com (owner request, 2026-10-27). Hex values are rendered sRGB.

| Token                                  | Light                             | Dark                           | Use                                       |
| -------------------------------------- | --------------------------------- | ------------------------------ | ----------------------------------------- |
| `--background`                         | `#FFFFFF`                         | `#0A0A0A`                      | Page background                           |
| `--foreground`                         | `#0A0A0A`                         | `#FAFAFA`                      | Primary text                              |
| `--card` / `--popover` (`--surface`)   | `#FFFFFF`                         | `#171717`                      | Cards, popovers                           |
| `--secondary` / `--muted` / `--accent` | `#F5F5F5`                         | `#262626`                      | Secondary fills, hover, pill tabs         |
| `--muted-foreground`                   | `#636363` (oklch 0.5)             | `#A1A1A1`                      | Secondary text, captions                  |
| `--primary`                            | `#0A0A0A`                         | `#E5E5E5`                      | Primary buttons (dark pills)              |
| `--primary-foreground`                 | `#FAFAFA`                         | `#0A0A0A`                      | Text on primary                           |
| `--brand`                              | `#6355FF` (oklch 0.569 0.241 279) | `#8A8FFF` (oklch 0.7 0.17 279) | Logo, chat bubbles, citation chips, ticks |
| `--brand-foreground`                   | `#FFFFFF`                         | `#0A0A0A`                      | Text and icons on brand                   |
| `--brand-soft`                         | `#EEEEF9`                         | `#23233E`                      | Lavender panels, headline highlight       |
| `--border`                             | `#E5E5E5`                         | white at 10%                   | Decorative hairlines, card edges          |
| `--input`                              | `#E5E5E5`                         | white at 15%                   | Form control outlines                     |
| `--ring`                               | brand                             | brand                          | Focus ring (shadcn applies it at 50%)     |
| `--destructive`                        | oklch(0.577 0.245 27)             | oklch(0.704 0.191 22)          | Errors only                               |
| `--glass`                              | `rgba(255,255,255,0.8)`           | `rgba(10,10,10,0.8)`           | Translucent header                        |

`--surface` / `--surface-secondary` alias `--card` / `--muted`. Chart and sidebar tokens are
shadcn defaults and unused on the landing page.

Rules:

- **Buttons stay near-black.** The main call to action is a dark pill with a violet icon tile.
  Violet is for brand moments (logo, user chat bubbles, citations, ticks), never a whole button.
- **One highlighted phrase per headline**, on a lavender block (`Highlight`). On a lavender panel
  the block switches to white (`tone="card"`). The heading must be `isolate` so the block sits
  behind the text and never clips descenders of the line above.
- **Never violet text on lavender** (4.27:1). Large headline text on lavender is foreground.
- **Status without colour.** "Available" = solid, "In progress" = secondary fill, "Coming soon" =
  outline. Nothing on the landing page is "Available" until it ships.
- `--destructive` is the only other hue, reserved for errors.
- Dark mode follows the system setting through `next-themes`, which sets the `.dark` class.

Contrast (WCAG 2.2 AA; checked 2026-10-27):

| Pair                                                | Ratio              | Needs | Result                           |
| --------------------------------------------------- | ------------------ | ----- | -------------------------------- |
| Text on background / card / muted / lavender        | 14.6–19.8          | 4.5   | Pass                             |
| Muted text on background / muted / lavender (light) | 6.00 / 5.50 / 5.20 | 4.5   | Pass                             |
| Muted text on dark surfaces and dark lavender       | 5.83–7.63          | 4.5   | Pass                             |
| Violet text on background (light / dark)            | 4.92 / 7.04        | 4.5   | Pass                             |
| Text on violet (light white / dark `#0A0A0A`)       | 4.92 / 7.04        | 4.5   | Pass                             |
| Violet text on lavender (light)                     | **4.27**           | 4.5   | **Avoid**: large text only       |
| Focus ring as applied, `ring/50` (light / dark)     | **2.09 / 2.52**    | 3     | **Fail** (was 1.54 / 1.87)       |
| `--input` outline (light / dark)                    | **1.26 / 1.47**    | 3     | **Fail** for real form fields    |
| `--border` (decorative only)                        | 1.25–1.26          | n/a   | Never the only edge of a control |

The ring opacity is set inside the shadcn components, so a fully passing focus ring needs either
an edited `ui/` file or a solid ring class on each control; fix before the first form ships,
together with a 3:1 `--input` grey.

## 3. Typography

One family: **Plus Jakarta Sans** (`--font-jakarta`, weights 400/500/600/800) for headings and
body, loaded with `next/font`; JetBrains Mono for code and file names.

| Role          | Weight | Size / line height                      | Tracking |
| ------------- | ------ | --------------------------------------- | -------- |
| Wordmark      | 800    | clamp(64px, 17vw, 208px) / 0.9 (footer) | -0.05em  |
| Display large | 800    | 88/88 (landing hero, `lg`+)             | -0.035em |
| Display       | 800    | 64/68 section headings, `md`+           | -0.035em |
| Display small | 800    | 40/44 mobile hero                       | -0.03em  |
| H1            | 800    | 40/44 desktop, 32/36 mobile             | -0.03em  |
| H2            | 600    | 28/34                                   | -0.02em  |
| H3            | 600    | 21/28                                   | -0.01em  |
| Body large    | 400    | 19/30                                   | 0        |
| Body          | 400    | 16/24                                   | 0        |
| Small         | 400    | 14/20                                   | 0        |
| Caption       | 500    | 12/16                                   | 0.01em   |
| Mono          | 400    | 14/22 (JetBrains Mono)                  | 0        |

- Load fonts with `next/font` (self-hosted, no layout shift).
- Heavy, very tight headlines with one highlighted phrase, and calm body text, give the style
  its character. Keep body
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
| Badge              | `--radius-full`, caption type; status shown without colour: solid, secondary fill or outline     |
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

Both in light and dark themes, then review them against this file and fix what you find.
