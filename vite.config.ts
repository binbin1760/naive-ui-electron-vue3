import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import electron from "vite-plugin-electron";
import render from "vite-plugin-electron-renderer";
import AutoImport from "unplugin-auto-import/vite";
import Conpoments from "unplugin-vue-components/vite";
import { NaiveUiResolver } from "unplugin-vue-components/resolvers";
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [NaiveUiResolver()],
      imports: ["vue", "vue-router"],
      dts: "src/dts/auto-import.d.ts",
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
      eslintrc: {
        enabled: true,
      },
    }),
    Conpoments({
      resolvers: [NaiveUiResolver()],
      deep: true,
      dirs: ["src/components"],
      dts: "src/dts/components.d.ts",
    }),
    electron({
      entry: "electron/index.ts",
    }),
    render(),
  ],
  base: "./",
  build: {
    outDir: "dist",
  },
  server: {
    port: 8484,
  },
});
