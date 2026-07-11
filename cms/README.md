# innerwork circle — Unified Headless CMS

A single **Decap CMS** admin console (`config.yml`) governs editorial content
for all three endpoints. This is the "unified headless database administration
console" from the proposal: git-backed, no runtime database, content ships as
static Markdown/JSON at build time (Jamstack).

## What it manages
| Collection                | Site | Purpose                                          |
|---------------------------|------|--------------------------------------------------|
| `site1_programs`         | 1    | B2B/B2C program rows (intensives, leadership…)   |
| `site1_testimonials`     | 1    | High-end customer testimonials                   |
| `site1_intake_submissions`| 1   | Intake form entries (written by form handler)    |
| `site2_podcasts`         | 2    | 12 podcast episodes (stream URLs)                |
| `site2_films`            | 2    | 6 cinematic documentary themes + laurels         |
| `site2_press`            | 2    | Festival selections / press laurels              |
| `site3_events`           | 3    | Chronological monthly timeline events            |
| `site3_editions`         | 3    | Multi-edition archive dropdowns + galleries      |
| `site3_galleries`        | 3    | Photo galleries                                  |

## Run it
```bash
# local authoring
npx decap-server        # local git auth backend
# then open the admin UI (served from any site's /admin or a root host)
```

## Production swap
Change the backend block to:
```yaml
backend:
  name: git-gateway
  branch: main
```
and enable **Netlify Identity** + **Git Gateway** on the hosting project.

## Media
`media_folder: cms/media` is served from the apex domain (`/media`) so all three
sub-sites reference one shared upload bucket. For local dev, point
`public_folder` at `/media`.
