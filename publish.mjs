// publish.mjs  (shared by all 3 sites)
// ----------------------------------------------------------------------------
// SAFE publish: copy build output (dist/*) into the matching repo subfolder,
// then rewrite ROOTED asset references (/_astro/...) to RELATIVE (./_astro/...)
// so the page works under BOTH local file:// double-click AND GitHub Pages.
//
// Why a rewrite instead of relying on Astro `base`? Astro's base handling
// emits either "/_astro/..." (rooted) or "/./_astro/..." (mangled) depending
// on version — neither resolves correctly under file://. Rewriting after the
// fact is deterministic.
//
// Usage: node publish.mjs <site-folder-name>
//   e.g. node publish.mjs site1-corporate-hub   (run from the repo root)
// ----------------------------------------------------------------------------
import { cpSync, existsSync, readdirSync, readFileSync, writeFileSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

// publish.mjs lives at the repo root, so repoRoot is its own directory.
const repoRoot = dirname(fileURLToPath(import.meta.url));
const site = process.argv[2];
if (!site) { console.error("✗ pass the site folder name, e.g. node publish.mjs site1-corporate-hub"); process.exit(1); }

const dist = join(repoRoot, "_source", site, "dist");
const outDir = join(repoRoot, site);

if (!existsSync(dist)) { console.error(`✗ ${dist} not found. Build ${site} first.`); process.exit(1); }

// 1) copy dist/* -> outDir
for (const entry of readdirSync(dist)) {
  cpSync(join(dist, entry), join(outDir, entry), { recursive: true, force: true });
}

// 2) rewrite rooted asset refs -> relative under outDir
const rewrite = (file) => {
  const s = statSync(file);
  if (s.isDirectory()) {
    for (const e of readdirSync(file)) rewrite(join(file, e));
    return;
  }
  if (!/\.(html|css|js|json)$/.test(file)) return;
  let txt = readFileSync(file, "utf8");
  const before = txt;
  // HTML attributes: href="/_astro/..." or src="/media/..." -> "./..."
  txt = txt.replace(/(href|src)="\/(_astro|media|admin)\//g, '$1="./$2/');
  // CSS/JS url() references: url(/_astro/...) -> url(./_astro/...)
  txt = txt.replace(/url\(\s*["']?\/(_astro|media|admin)\//g, 'url(./$1/');
  if (txt !== before) writeFileSync(file, txt);
};

rewrite(outDir);
console.log(`✓ Published ${site} → /${site}/ (asset refs relativized)`);
