# innerwork circle — Shared Components

Reusable Astro components imported by all three sites. These implement the
proposal's media + form + search requirements and are styled by the shared
design-system tokens.

| Component                         | Implements                                            |
|-----------------------------------|-------------------------------------------------------|
| `LazyMediaFrame.astro`            | Lazy-loaded iframe container — streams YouTube/Vimeo/Spotify on click; never blocks first paint. |
| `DynamicContactForm.astro`        | Schema-driven dynamic form — data-driven fields, front-end validation, Netlify-compatible handler. |
| `SeoSchema.astro`                 | JSON-LD `@graph` injector — SEO / AEO / GEO structured data for program blocks, event dates, media. |
