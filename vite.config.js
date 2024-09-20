import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { fileURLToPath, URL } from "node:url";

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  server: {
    proxy: {
      "/scorm-content": {
        target: "http://localhost:3000",
        changeOrigin: true,
      },
      "/scorm": {
        target: "http://localhost:3000",
        changeOrigin: true,
      },
      "/upload-scorm": {
        target: "http://localhost:3000",
        changeOrigin: true,
      },
    },
  },
});
