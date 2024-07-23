import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import pkg from "./package.json";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // outDir: "dist",
    minify: "esbuild",
    // cssCodeSplit: false,
    sourcemap: true,
    rollupOptions: {
      output: {
          assetFileNames: `${pkg.version}/[ext]/[name][extname]`,
          chunkFileNames: `${pkg.version}/[chunks]/[name].[hash].js`,
          entryFileNames: `${pkg.version}/webcomponents-bundle.js`
      }
  }
  }
})
