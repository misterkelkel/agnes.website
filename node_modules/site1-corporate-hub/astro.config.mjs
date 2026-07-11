// Site 1 — Corporate & Program Hub
// Maps Vite aliases to the SHARED monorepo modules so brand tokens,
// components, and CMS config stay single-sourced across all three sites.
import { defineConfig } from "astro/config";
import { fileURLToPath } from "node:url";

const r = (p) => fileURLToPath(new URL(p, import.meta.url));

export default defineConfig({
  // Canonical site URL (used for absolute links + sitemap in production).
  site: "https://misterkelkel.github.io",
  // GitHub Pages project subpath: https://misterkelkel.github.io/agnes.website/
  // All asset URLs are prefixed with this so they resolve under the subpath.
  base: "/agnes.website",
  // Build into the site's own dist/ first (safe — Astro's clean step will not
  // touch the repo root). A post-build copy step publishes dist/* to the repo
  // root for GitHub Pages (see package.json "build" script + copy-to-root.mjs).
  outDir: "./dist",
  srcDir: "./src",
  vite: {
    resolve: {
      alias: {
        "@design-system": r("../design-system"),
        "@components": r("../components"),
        "@cms": r("../cms"),
      },
    },
  },
});
