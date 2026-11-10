import { defineConfig } from "vite";
import path from "path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  // No custom domain yet: GitHub Pages serves the site at norin-web.github.io/Synthv2rf/.
  // When a domain is attached, switch to "/" AND add public/CNAME in the same commit,
  // or every asset 404s and the page goes blank.
  base: "/Synthv2rf/",
  plugins: [react(), tailwindcss()],
  resolve: { alias: { "@": path.resolve(__dirname, "./src") } },
});
