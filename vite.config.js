import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import eslint from "vite-plugin-eslint";
import path from "path"; // 👈 add this

export default defineConfig({
  plugins: [react(), eslint()],
  resolve: {
    alias: {
      ui: path.resolve(__dirname, "./src/ui"),
    },
  },
});
