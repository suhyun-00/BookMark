import { defineConfig } from "vite";
import { resolve } from "path";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import "dotenv/config";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    open: true,
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
      "@mocks": resolve(__dirname, "src/mocks"),
      "@components": resolve(__dirname, "src/components"),
      "@customTypes": resolve(__dirname, "src/types"),
    },
  },
});
