# IMPLEMENTATION PLAN — Sistem Pelesenan MPOB (e-Lesen Demo)

## 1. Project Architecture

Static HTML prototype for presenting the MPOB Licensing System UI to stakeholders. No backend, no API calls — all data is hardcoded placeholder. Deployable to GitHub Pages.

- **Build tool:** Vite
- **Language:** TypeScript (vanilla, no frameworks)
- **Styling:** TailwindCSS v4 (CSS-based config, `@tailwindcss/vite` plugin)
- **Icons:** Lucide (npm package, NOT CDN)
- **Linting:** ESLint + HTMLHint
- **Formatting:** Prettier
- **Deployment:** gh-pages

---

## 2. Directory Structure

```
e-lesen-demo/
├── src/
│   ├── assets/
│   │   └── logo/              # MPOB logo placeholder
│   ├── styles/
│   │   └── main.css           # TailwindCSS v4 config + custom utilities
│   ├── main.ts                # Entry: dark mode, layout loader, icons
│   ├── layout.ts              # Shared sidebar/header partial loader
│   └── pages/                 # Page-specific TS modules (if needed)
├── pages/
│   ├── index.html             # Landing / Login
│   ├── daftar.html            # Pendaftaran Pengguna Baru
│   ├── pemohon/               # Pemohon (Applicant) pages
│   │   ├── dashboard.html
│   │   ├── permohonan-baharu.html
│   │   ├── pembaharuan.html
│   │   ├── pindaan.html
│   │   ├── status.html
│   │   └── profil.html
│   ├── pelesen/               # Pemegang Lesen (License Holder) pages
│   │   ├── dashboard.html
│   │   ├── senarai-lesen.html
│   │   ├── penyata-bulanan.html
│   │   ├── pembaharuan.html
│   │   ├── pindaan.html
│   │   └── profil.html
│   ├── pegawai/               # Pegawai Pemproses (Processing Officer) pages
│   │   ├── dashboard.html
│   │   ├── senarai-permohonan.html
│   │   ├── semakan-permohonan.html
│   │   ├── penilaian-tapak.html
│   │   ├── e-pemantauan.html
│   │   ├── carian.html
│   │   └── laporan.html
│   └── admin/                 # Pentadbir Sistem (System Admin) pages
│       ├── dashboard.html
│       ├── pengurusan-pengguna.html
│       ├── tetapan-kpi.html
│       ├── konfigurasi-workflow.html
│       ├── audit-trail.html
│       ├── senarai-hitam.html
│       ├── laporan-statistik.html
│       └── tetapan.html
├── public/
│   └── partials/
│       ├── sidebar.html       # Shared sidebar (role-based nav)
│       └── header.html        # Shared header (breadcrumbs, dark mode, user menu)
├── package.json
├── vite.config.ts
├── tsconfig.json
├── eslint.config.js
├── .htmlhintrc
├── .prettierrc
├── .gitignore
├── SPECIFICATION.md
├── IMPLEMENTATION_PLAN.md
├── README.md
└── CLAUDE.md
```

---

## 3. Vite Setup

- `root: '.'` (project root — NEVER `pages`)
- Custom `pagesRewrite` plugin for dev server URL mapping (`/` → `/pages/index.html`)
- Custom `flattenPagesOutput` plugin to move `dist/pages/*` → `dist/*` post-build
- `base: '/'` (assuming custom domain; will confirm with user)
- Rollup input: glob `pages/**/*.html`
- Dependencies: `@types/node`, `glob`

---

## 4. TailwindCSS Configuration

In `src/styles/main.css`:

- `@import 'tailwindcss'`
- `@source "../../pages/**/*.html"`
- `@custom-variant dark (&:where(.dark, .dark *))`
- `@theme` block with MPOB brand colors:
  - Primary: dark blue/teal (`#2f4858` or similar government blue)
  - Accent: MPOB green (`#2e7d32` or similar palm oil green)
  - Secondary accents for status indicators
- Custom `@utility` classes: `btn-primary`, `btn-secondary`, `card`, `stat-card`, `badge`, `form-input`, `form-label`, `data-table`

**No** `tailwind.config.ts` or `postcss.config.js`.

---

## 5. ESLint Setup

- `typescript-eslint` with recommended config
- `eslint-config-prettier` to avoid conflicts
- Warn on `no-explicit-any` and `no-unused-vars`

---

## 6. HTML Linting Setup

- HTMLHint with `.htmlhintrc`
- Rules: tag-pair, doctype-first, id-unique, title-require, attr-value-double-quotes

---

## 7. Light Mode and Dark Mode Strategy

- Toggle via `.dark` class on `<html>` element
- TailwindCSS v4 `@custom-variant dark` directive
- Persist preference to `localStorage`
- Toggle button in shared header partial
- Default: light mode (follow system preference optional)

---

## 8. Layout System (Sidebar, Header, Content)

### Sidebar (`public/partials/sidebar.html`)
- Fixed left sidebar, FilamentPHP-inspired
- Logo slot at top (MPOB logo placeholder)
- Navigation grouped by role/module:
  - **Utama:** Dashboard
  - **Pelesenan:** Permohonan, Pembaharuan, Pindaan, Status
  - **Pemantauan:** e-Pemantauan, Carian
  - **Laporan:** Statistik, Laporan
  - **Pentadbiran:** Pengguna, KPI, Workflow, Audit Trail
- Active page highlighting
- Collapsible on mobile (hamburger menu)
- Icons via Lucide `data-lucide` attributes

### Header (`public/partials/header.html`)
- Page title + breadcrumbs
- Dark mode toggle
- Notification bell (placeholder)
- User avatar dropdown (placeholder)
- Language toggle (BM/EN placeholder)

### Content Area
- Main scrollable area
- Consistent padding and max-width
- Cards, tables, stat widgets per page

### Layout Loader (`src/layout.ts`)
- Fetches partials using `import.meta.env.BASE_URL` prefix
- Injects into `#sidebar` and `#header` containers
- Re-initializes Lucide icons after injection

---

## 9. Reusable UI Components Strategy

Since no framework, reusable elements are handled via:

1. **TailwindCSS `@utility` classes** — `btn-primary`, `card`, `stat-card`, `badge`, `form-input`, `data-table`
2. **HTML partials** — sidebar, header fetched at runtime from `public/partials/`
3. **Copy-paste patterns** — tables, forms, stat grids are duplicated per page with different placeholder data (acceptable for prototype)

---

## 10. Page Organization inside `pages/`

Organized by user role (matching SPECIFICATION.md categories):

| Role | Directory | Description |
|------|-----------|-------------|
| Public | `pages/` (root) | Login, registration |
| Pemohon | `pages/pemohon/` | Applicant — new applications, renewals, amendments |
| Pemegang Lesen | `pages/pelesen/` | License holder — license list, monthly statements |
| Pegawai | `pages/pegawai/` | Processing officer — review, monitoring, site assessment |
| Pentadbir | `pages/admin/` | System admin — user management, KPI, audit trail |

---

## 11. Asset Management

- **Logo:** `src/assets/logo/` — placeholder MPOB logo (SVG or PNG)
- **Icons:** Lucide npm package, initialized in `main.ts`
- **Styles:** Single `src/styles/main.css` with TailwindCSS v4
- **No images CDN** — all assets local

---

## 12. GitHub Pages Deployment Strategy

- `gh-pages` npm package
- `npm run deploy` = `npm run build && gh-pages -d dist`
- `flattenPagesOutput` plugin ensures clean `dist/` structure
- **Base path:** `base: '/'` (custom domain: `e-lesen.borang.my`)
- After first deploy: configure GitHub Settings > Pages > source branch `gh-pages`, set custom domain to `e-lesen.borang.my`

---

## 13. Documentation Plan

### README.md
- Project overview (MPOB Licensing System Prototype)
- Tech stack
- Setup: `npm install` → `npm run dev`
- Scripts: `dev`, `build`, `lint`, `format`, `deploy`
- Page structure and how to add new pages
- Malay-language labels explanation

### CLAUDE.md
- Project purpose and constraints
- Tech stack (TailwindCSS v4, NOT v3)
- Key commands
- Directory conventions
- Layout system
- How to add a new page
- Vite plugin explanations

---

## 14. Git Workflow and Commit Convention

Format:
```
feat: {description}
fix: {description}
```

Pre-commit checklist (every commit):
1. `npm run format`
2. `npm run format:check`
3. `npm run lint:js`
4. `npm run lint:html`
5. `npm run build`

---

## 15. Prettier / Code Formatting Setup

```json
{
  "semi": false,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "printWidth": 100
}
```

Integrated with ESLint via `eslint-config-prettier`.

---

## 16. Responsive Design Strategy

- **Mobile-first** approach using Tailwind responsive prefixes
- **Mobile (< 768px):** Sidebar hidden, hamburger menu overlay, single-column content, tables horizontally scrollable
- **Tablet (768px–1024px):** Sidebar collapsed to icons-only, 2-column grids
- **Desktop (> 1024px):** Full sidebar with labels, multi-column layouts
- All pages tested at 3 breakpoints minimum
- Target: modern evergreen browsers only

---

## 17. Recommended Workflow for Creating New Prototype Pages

1. Create HTML file in `pages/<role>/`
2. Copy layout skeleton from existing page (sidebar container, header container, main content)
3. Reference assets with absolute paths: `/src/styles/main.css`, `/src/main.ts`
4. Add navigation link in `public/partials/sidebar.html`
5. Populate with placeholder data appropriate to the page purpose
6. Add Lucide icons via `data-lucide` attributes
7. Ensure dark mode classes (`dark:`) on all elements
8. Test responsive at mobile/tablet/desktop
9. Run lint + format + build
10. Commit: `feat: add <role> <page-name> prototype`

---

## 18. Initial Prototype Page List

Based on SPECIFICATION.md, the following pages will be scaffolded in the initial implementation:

### Public Pages (no auth)
| File | Purpose | Key UI Elements |
|------|---------|----------------|
| `pages/index.html` | Login / Landing page | Login form, MPOB branding, links to register, forgot password, system announcements |
| `pages/daftar.html` | New user registration | Registration form, user category selection |

### Pemohon (Applicant) Pages
| File | Purpose | Key UI Elements |
|------|---------|----------------|
| `pages/pemohon/dashboard.html` | Applicant overview | Status cards (pending, approved, rejected), recent applications list, quick actions |
| `pages/pemohon/permohonan-baharu.html` | New license application | Multi-step wizard form (company info, license type, documents upload placeholder) |
| `pages/pemohon/pembaharuan.html` | License renewal | List of expiring licenses, renewal form |
| `pages/pemohon/pindaan.html` | License amendment | Amendment type selection, amendment form |
| `pages/pemohon/status.html` | Application status tracking | Status timeline, application details, document checklist |
| `pages/pemohon/profil.html` | User profile | Profile form, company details, change password |

### Pemegang Lesen (License Holder) Pages
| File | Purpose | Key UI Elements |
|------|---------|----------------|
| `pages/pelesen/dashboard.html` | License holder overview | Active licenses count, expiry alerts, monthly statement reminders |
| `pages/pelesen/senarai-lesen.html` | License list | Data table with filters, license status badges, QR code placeholder |
| `pages/pelesen/penyata-bulanan.html` | Monthly statement (MB4/KB4) | Statement form, submission history table |
| `pages/pelesen/pembaharuan.html` | License renewal | Renewal form with license selection |
| `pages/pelesen/pindaan.html` | License amendment | Amendment request form |
| `pages/pelesen/profil.html` | Profile management | Company details, directors list, premises info |

### Pegawai (Processing Officer) Pages
| File | Purpose | Key UI Elements |
|------|---------|----------------|
| `pages/pegawai/dashboard.html` | Officer dashboard | KPI stats (pending tasks, overdue, processed today), task queue, alerts |
| `pages/pegawai/senarai-permohonan.html` | Application list | Filterable data table, status filters, bulk actions |
| `pages/pegawai/semakan-permohonan.html` | Application review | Application detail view, document viewer placeholder, approval/reject actions, comments |
| `pages/pegawai/penilaian-tapak.html` | Site assessment | Assessment form, photo upload placeholder, GPS coordinates, map placeholder |
| `pages/pegawai/e-pemantauan.html` | Monitoring dashboard | Application tracking, KPI timeline, search by ref no/name/license |
| `pages/pegawai/carian.html` | Search module | Multi-criteria search form (name, IC, license no, lot no by state/district/mukim), results table |
| `pages/pegawai/laporan.html` | Reports | Report type selection, date range filters, export buttons (PDF/Excel/CSV placeholder) |

### Pentadbir (System Admin) Pages
| File | Purpose | Key UI Elements |
|------|---------|----------------|
| `pages/admin/dashboard.html` | Admin dashboard | System stats (total users, active licenses, daily transactions), activity chart placeholder |
| `pages/admin/pengurusan-pengguna.html` | User management | User table with role badges, add/edit/deactivate actions, role assignment |
| `pages/admin/tetapan-kpi.html` | KPI settings | KPI configuration table (processing time targets per application type) |
| `pages/admin/konfigurasi-workflow.html` | Workflow configuration | Workflow step list, approval chain visualization placeholder |
| `pages/admin/audit-trail.html` | Audit trail | Audit log table with filters (user, action, date range), activity details |
| `pages/admin/senarai-hitam.html` | Blacklist & Watchlist | Blacklisted entities table, watchlist table, add/remove actions |
| `pages/admin/laporan-statistik.html` | Reports & Statistics | Dashboard with charts placeholder, dynamic query builder, export options |
| `pages/admin/tetapan.html` | System settings | General settings form, notification config, announcement management |

### Total: 28 pages

---

## Implementation Priority

**Phase 1 — Foundation (scaffold first):**
1. Project setup (Vite, TailwindCSS v4, ESLint, Prettier, HTMLHint)
2. Layout system (sidebar, header partials)
3. Dark mode
4. `pages/index.html` (login)

**Phase 2 — Core Role Dashboards:**
5. `pages/admin/dashboard.html`
6. `pages/pegawai/dashboard.html`
7. `pages/pemohon/dashboard.html`
8. `pages/pelesen/dashboard.html`

**Phase 3 — Key Workflow Pages:**
9. Application pages (pemohon)
10. Review pages (pegawai)
11. License management (pelesen)

**Phase 4 — Admin & Supporting Pages:**
12. Admin management pages
13. Reports, search, monitoring pages
14. Registration page

**Phase 5 — Polish & Deploy:**
15. Responsive testing
16. README.md, CLAUDE.md
17. GitHub Pages deployment
