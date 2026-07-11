# innerwork circle — Design System

The **single source of truth** for the premium minimalist editorial design
language shared by all three innerwork circle endpoints.

## Files
- `tokens.css` — all brand design tokens (color, type, space, radius, motion).
  Imported by every site. **Never redefine brand tokens inside a site.**
- `global.css` — minimalist editorial baseline (reset, typography, container,
  hairline rules, eyebrow label). Imports `tokens.css`.

## How a site consumes this
Each Astro site maps a Vite alias `@design-system` → `../../design-system` and
imports the framework once in its base layout:

```js
// astro.config.mjs
export default defineConfig({
  vite: { resolve: { alias: { '@design-system': '../../design-system' } } },
});
```

```css
/* src/styles/global.css */
@import "@design-system/global.css";
```

## Token contract (must stay stable)
| Token group      | Anchor values                                              |
|------------------|------------------------------------------------------------|
| Background       | `--iw-color-bg: #fcf8f2` (cream/beige)                    |
| Ink / text       | `--iw-color-ink: #1b3322` (dark forest green)             |
| Typeface         | `--iw-font-serif` elegant serif (Cormorant / Playfair)    |
| Accent (sparing) | `--iw-color-accent: #9c7b4d` (muted bronze)              |

Any new token is added here first, then referenced everywhere else.
