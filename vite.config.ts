import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import AutoImport from "unplugin-auto-import/vite";
import Conpoments from "unplugin-vue-components/vite";
import { NaiveUiResolver } from "unplugin-vue-components/resolvers";
import { fileURLToPath } from "url";
import { devPlugin, getReplacer } from "./plugins/devPlugin"
import optimizer from "vite-plugin-optimizer";
import { buildPlugin } from './plugins/buildPlugin'

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
    devPlugin(),
    optimizer(getReplacer())
  ],
  build: {
    rollupOptions: {
      plugins: [buildPlugin()]
    }
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
