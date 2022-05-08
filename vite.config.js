import { defineConfig } from "vite";
// import { createVuePlugin } from "vite-plugin-vue2";
import vue from "@vitejs/plugin-vue";
// import vue from "@vue/compat";
import WindiCSS from "vite-plugin-windicss";
import path from "path";

export default defineConfig({
  resolve: {
    alias: [
      {
        find: "@",
        replacement: path.resolve(__dirname, "src"),
      },
      // { vue: "@vue/compat" },
    ],
  },
  plugins: [
    // createVuePlugin(),
    vue({
      // template: {
      //   compilerOptions: {
      //     compatConfig: {
      //       MODE: 2,
      //     },
      //   },
      // },
    }),
    WindiCSS({ preflight: false }),
  ],
  server: {
    port: 8080,
    proxy: {
      "/api": "http://localhost:8008",
      "/avatar": "http://localhost:8008",
    },
  },
});
