// Site 2 — Creative Media Studios (Open Residency reference style)
import { defineConfig } from "astro/config";
import { fileURLToPath } from "node:url";

const r = (p) => fileURLToPath(new URL(p, import.meta.url));

export default defineConfig({
  site: "https://studios.innerworkcircle.co",
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
