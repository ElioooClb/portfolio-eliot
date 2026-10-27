import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/portfolio-eliot/",
  publicDir: "public",
  build: {
    copyPublicDir: true,
    // Le fichier de la carte 3D (three.js, ~880 Ko, ~240 Ko compressé) n'est
    // chargé qu'à l'ouverture de la page Infrastructure (React.lazy)
    chunkSizeWarningLimit: 1000,
  },
  plugins: [react()],
});
