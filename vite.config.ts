import react from "@vitejs/plugin-react";
import dotenv from "dotenv";
import path from "path";
import {defineConfig} from "vite";

dotenv.config();

export default defineConfig({
  build: {
    outDir: "dist",
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@styles": path.resolve(__dirname, "./src/styles"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@pages": path.resolve(__dirname, "./src/pages"),
    },
  },
  plugins: [react()],
});
