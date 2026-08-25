import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Builds the demo playground as a normal static site (no library mode).
// `base` lets GitHub Pages serve it from /<repo>/ — set DEMO_BASE=/loader/ there.
export default defineConfig({
  plugins: [react()],
  base: process.env.DEMO_BASE ?? "/",
  build: { outDir: "dist-demo", emptyOutDir: true },
});
