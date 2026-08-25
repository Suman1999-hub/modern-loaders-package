import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";
import { libInjectCss } from "vite-plugin-lib-inject-css";
import { fileURLToPath } from "node:url";

// `npm run dev` serves the demo app from index.html.
// `npm run build` produces the publishable library in dist/.
export default defineConfig({
  plugins: [
    react(),
    libInjectCss(), // consumers get the CSS automatically — no extra import needed
    dts({ include: ["src"], rollupTypes: true }),
  ],
  build: {
    lib: {
      entry: fileURLToPath(new URL("src/index.ts", import.meta.url)),
      formats: ["es", "cjs"],
      fileName: (format) => (format === "es" ? "index.js" : "index.cjs"),
    },
    rollupOptions: {
      external: ["react", "react-dom", "react/jsx-runtime"],
      output: { assetFileNames: "index.css" },
    },
    sourcemap: true,
  },
});
