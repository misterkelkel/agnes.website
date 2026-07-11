# innerwork circle — Modular Multi-Site Blueprint

Three distinct, highly targeted Jamstack micro-sites sharing **one** premium
minimalist editorial design language and **one** unified headless CMS console.
Built fresh on [Astro](https://astro.build) (static-first) + [Decap CMS](https://decapcms.org)
(git-backed content). No legacy templates, no runtime database.

## Architecture
```
innerwork_circle_3site/
├── design-system/      ← SINGLE SOURCE OF TRUTH (tokens + base styles)
├── components/         ← shared LazyMediaFrame / ContactForm / SeoSchema
├── cms/                ← UNIFIED headless admin console (config.yml)
├── site1-corporate-hub/      B2B/B2C programs + testimonials
├── site2-media-studios/      Open Residency editorial — podcasts + films
└── site3-community-portal/   Chronological timeline + edition archives
```

Each site maps Vite aliases (`@design-system`, `@components`, `@cms`) back to
the shared modules, so brand tokens and components are never duplicated.

## Design tokens (the contract)
| Token | Value | Meaning |
|-------|-------|---------|
| `--iw-color-bg` | `#fcf8f2` | cream / beige canvas |
| `--iw-color-ink` | `#1b3322` | dark forest green text |
| `--iw-font-serif` | Cormorant Garamond / Playfair | elegant serif voice |
| `--iw-color-accent` | `#9c7b4d` | muted bronze (sparing) |

## Proposal requirements → implementation
- **Premium minimalist editorial look** → `design-system/tokens.css` + `global.css`
- **Lazy-loaded media frames** → `components/MediaFrame.astro` (streams YT/Vimeo/Spotify on click)
- **Dynamic form component** → `components/ContactForm.astro` (schema-driven)
- **SEO / AEO / GEO** → `components/SeoSchema.astro` (JSON-LD `@graph`)
- **Unified headless console** → `cms/config.yml` (9 collections across 3 sites)

## Run locally
```bash
npm install                       # installs each workspace
npm run dev --workspace site1-corporate-hub
# CMS authoring:
npx decap-server                  # local git backend
# open any site's /admin
```

## Deploy
Static build per site → host on subdomains
(`hub.`, `studios.`, `community.innerworkcircle.co`) or one CDN.
