import { defineConfig } from "vite";
import { createVuePlugin } from "vite-plugin-vue2";
import path from "path";

export default defineConfig({
  plugins: [createVuePlugin()],
  resolve: {
    alias: [
      {
        find: "@",
        replacement: path.resolve(__dirname, "src"),
      },
    ],
  },
  server: {
    port: 8080,
    proxy: {
      "/api": "http://localhost:8008",
      "/avatar": "http://localhost:8008",
    },
  },
});
