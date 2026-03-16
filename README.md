# Sistem Pelesenan MPOB — e-Lesen Demo

Static HTML prototype for the MPOB (Malaysian Palm Oil Board) Licensing System. Built for presenting UI concepts to stakeholders — no backend or API integration.

## Tech Stack

- [Vite](https://vitejs.dev/) — build tool & dev server
- [TailwindCSS v4](https://tailwindcss.com/) — utility-first CSS
- [TypeScript](https://www.typescriptlang.org/) — vanilla TS (no frameworks)
- [Lucide](https://lucide.dev/) — icon library
- [ESLint](https://eslint.org/) + [HTMLHint](https://htmlhint.com/) — linting
- [Prettier](https://prettier.io/) — code formatting
- [gh-pages](https://www.npmjs.com/package/gh-pages) — GitHub Pages deployment

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev
```

Visit `http://localhost:5173/` to view the prototype.

## Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start Vite dev server |
| `npm run build` | TypeScript check + production build |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint + HTMLHint |
| `npm run lint:js` | Run ESLint on `src/` |
| `npm run lint:html` | Run HTMLHint on `pages/` |
| `npm run format` | Format code with Prettier |
| `npm run format:check` | Check formatting without writing |
| `npm run deploy` | Build and deploy to GitHub Pages |

## Page Structure

All HTML prototype pages are inside the `pages/` directory, organized by user role:

```
pages/
├── index.html                  # Login / Landing page
├── daftar.html                 # New user registration
├── pemohon/                    # Pemohon (Applicant)
│   ├── dashboard.html
│   ├── permohonan-baharu.html  # New license application
│   ├── pembaharuan.html        # License renewal
│   ├── pindaan.html            # License amendment
│   ├── status.html             # Application status tracking
│   └── profil.html             # User profile
├── pelesen/                    # Pemegang Lesen (License Holder)
│   ├── dashboard.html
│   ├── senarai-lesen.html      # License list
│   ├── penyata-bulanan.html    # Monthly statement (MB4/KB4)
│   ├── pembaharuan.html        # License renewal
│   ├── pindaan.html            # License amendment
│   └── profil.html             # Profile management
├── pegawai/                    # Pegawai (Processing Officer)
│   ├── dashboard.html
│   ├── senarai-permohonan.html # Application list
│   ├── semakan-permohonan.html # Application review
│   ├── penilaian-tapak.html    # Site assessment
│   ├── e-pemantauan.html       # Monitoring dashboard
│   ├── carian.html             # Search module
│   └── laporan.html            # Reports
└── admin/                      # Pentadbir (System Admin)
    ├── dashboard.html
    ├── pengurusan-pengguna.html # User management
    ├── konfigurasi-workflow.html # Workflow configuration
    ├── audit-trail.html         # Audit trail
    ├── senarai-hitam.html       # Blacklist & Watchlist
    ├── laporan-statistik.html   # Reports & Statistics
    └── tetapan.html             # System settings (includes KPI config)
```

## Adding a New Page

1. Create the HTML file in the appropriate `pages/<role>/` directory
2. Copy the layout structure from an existing page
3. Use absolute paths for assets:
   ```html
   <link rel="stylesheet" href="/src/styles/main.css" />
   <script type="module" src="/src/main.ts"></script>
   ```
4. Add a navigation link in the appropriate `public/partials/sidebar-<role>.html`
5. Add placeholder content and ensure dark mode support
6. Test at mobile, tablet, and desktop breakpoints
7. Run `npm run format && npm run lint && npm run build`

## Deployment

```bash
npm run deploy
```

After first deploy, go to your GitHub repository **Settings > Pages** and set the source branch to `gh-pages`.

**Live demo:** [e-lesen.borang.my](https://e-lesen.borang.my)

## License

Private — for demonstration purposes only.
