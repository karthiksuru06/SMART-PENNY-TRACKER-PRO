import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "localhost", // safer for most setups; use "::" only if you know why
    port: 8080,
    open: true, // auto-open browser when dev server starts
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "~": path.resolve(__dirname, "src/assets"), // optional: for styles/images
    },
  },
  css: {
    preprocessorOptions: {
      // optional: if you're using SCSS or other preprocessors
      // scss: {
      //   additionalData: `@import "@/styles/variables.scss";`,
      // },
    },
  },
}));
