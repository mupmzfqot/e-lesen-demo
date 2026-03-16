# CLAUDE.md — Sistem Pelesenan MPOB (e-Lesen Demo)

## Project Purpose

Static HTML prototype for the MPOB Licensing System. No backend, no API calls — all data is hardcoded placeholder. Used by sales team to present UI concepts to clients. Deployable to GitHub Pages.

## Tech Stack

- **Vite** — build tool and dev server
- **TypeScript** — vanilla TS, NO frameworks (no Vue, React, Angular)
- **TailwindCSS v4** — CSS-based config via `@tailwindcss/vite` plugin
  - **NOT v3** — no `tailwind.config.ts`, no `postcss.config.js`
  - Config lives in `src/styles/main.css` using `@import 'tailwindcss'`, `@theme`, `@utility`, `@custom-variant`
- **Lucide** — icons via npm package (NOT CDN), initialized in `main.ts`
- **ESLint + HTMLHint + Prettier** — linting and formatting

## Key Commands

```bash
npm run dev          # Start dev server (localhost:5173)
npm run build        # TypeScript check + Vite build
npm run lint         # ESLint (src/) + HTMLHint (pages/)
npm run lint:js      # ESLint only
npm run lint:html    # HTMLHint only
npm run format       # Prettier write
npm run format:check # Prettier check
npm run deploy       # Build + deploy to GitHub Pages
```

## Directory Conventions

- **`pages/`** — ALL HTML prototype pages live here, organized by role:
  - `pages/index.html`, `pages/daftar.html` — public pages
  - `pages/pemohon/` — Applicant pages
  - `pages/pelesen/` — License Holder pages
  - `pages/pegawai/` — Processing Officer pages
  - `pages/admin/` — System Admin pages
- **`src/`** — TypeScript, styles, assets
- **`public/partials/`** — Shared HTML partials (sidebar, header). MUST be in `public/`, NOT `src/` — Vite does not copy runtime-fetched files from `src/` to `dist/`

## Layout System

Shared sidebar and header are loaded at runtime via `src/layout.ts`:

1. `public/partials/sidebar.html` → injected into `#sidebar`
2. `public/partials/header.html` → injected into `#header`
3. Lucide icons re-initialized after injection

Every page follows this skeleton:

```html
<body>
  <div id="sidebar"></div>
  <div id="app">
    <div id="header"></div>
    <main><!-- page content --></main>
  </div>
  <script type="module" src="/src/main.ts"></script>
</body>
```

## Dark Mode

- Toggle `.dark` class on `<html>` via button in header
- Persisted to `localStorage`
- TailwindCSS v4: `@custom-variant dark (&:where(.dark, .dark *))`
- All elements must include `dark:` variants

## How to Add a New Page

1. Create HTML file in `pages/<role>/` (e.g., `pages/pegawai/new-page.html`)
2. Copy layout skeleton from an existing page
3. Use absolute paths: `/src/styles/main.css`, `/src/main.ts`
4. Add nav link in `public/partials/sidebar.html`
5. Populate with placeholder data
6. Use `data-lucide="icon-name"` for icons
7. Ensure `dark:` classes on all styled elements
8. Test responsive (mobile/tablet/desktop)
9. Run: `npm run format && npm run lint && npm run build`
10. Commit: `feat: add <role> <page-name> prototype`

## HTML Asset Paths

All HTML pages MUST use absolute paths from project root:

```html
<link rel="stylesheet" href="/src/styles/main.css" />
<script type="module" src="/src/main.ts"></script>
```

NEVER use relative paths like `../src/` — they break across nesting levels.

## Vite Plugins

- **`pagesRewrite`** — dev server middleware that rewrites `/` → `/pages/index.html` and `/admin/x` → `/pages/admin/x`
- **`flattenPagesOutput`** — post-build hook that moves `dist/pages/*` → `dist/*` for clean GitHub Pages URLs

## Base Path

- Custom domain `e-lesen.borang.my` — `base: '/'` (no conditional logic needed)

## TailwindCSS v4 Pitfalls

- Use `@utility` NOT `@layer components` for custom classes with `@apply`
- Cannot nest `@apply` of one custom `@utility` inside another — inline all styles
- Use `@theme` block for colors, NOT JS config
- `@source` directive replaces `content` array

## Commit Convention

```
feat: {description}
fix: {description}
```

Always run format + lint + build before committing.
