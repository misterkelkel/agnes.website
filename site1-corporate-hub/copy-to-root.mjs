// copy-to-root.mjs
// ----------------------------------------------------------------------------
// SAFE publish step: copies the site1 build output (dist/*) into the REPO ROOT
// so GitHub Pages serves index.html from the project root.
//
// Why not outDir:"../"? Astro's pre-build clean step would rimraf the repo
// root and try to delete node_modules (EPERM on Windows). Copying instead keeps
// source + generated output separated and never deletes the repo.
//
// Usage: node copy-to-root.mjs   (run after `astro build`)
// ----------------------------------------------------------------------------
import { cpSync, existsSync, mkdirSync, readdirSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const dist = join(__dirname, "dist");
const root = join(__dirname, ".."); // repo root = parent of site1-corporate-hub

if (!existsSync(dist)) {
  console.error("✗ dist/ not found. Run `astro build` first.");
  process.exit(1);
}

// Only copy known build artifacts — never touch source/repo files.
const ALLOWED = new Set(["index.html", "_astro", "admin", "favicon.svg", "favicon.ico", "robots.txt", "404.html"]);
for (const entry of readdirSync(dist)) {
  if (!ALLOWED.has(entry)) continue;
  const from = join(dist, entry);
  const to = join(root, entry);
  cpSync(from, to, { recursive: true, force: true });
  console.log(`  → ${entry}/ (${statSync(from).isDirectory() ? "dir" : "file"}) → repo root`);
}
console.log("✓ Published site1 production bundle to repo root.");
