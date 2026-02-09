import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/portfolio-eliot/",
  publicDir: "public",
  build: {
    copyPublicDir: true,
  },
  plugins: [react()],
});
