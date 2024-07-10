import fs from "fs";
import { resolve } from "path";

import { defineConfig, Plugin } from "vite";
import { imagetools } from "vite-imagetools";
import { nodePolyfills } from "vite-plugin-node-polyfills";
import tsconfigPaths from "vite-tsconfig-paths";
import { lingui } from "@lingui/vite-plugin";
import { sentryVitePlugin } from "@sentry/vite-plugin";
import react from "@vitejs/plugin-react";

const base64Loader: Plugin = {
  name: "base64-loader",
  transform(_: unknown, id: string) {
    const [path, query] = id.split("?");
    if (query != "base64") return null;

    const data = fs.readFileSync(path);
    const base64 = data.toString("base64");

    return `export default '${base64}';`;
  },
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    imagetools(),
    react({
      babel: {
        plugins: ["macros"],
      },
    }),
    lingui(),
    nodePolyfills(),
    tsconfigPaths(),
    base64Loader,
    sentryVitePlugin({
      authToken: process.env.SENTRY_AUTH_TOKEN,
      org: "home-d3v",
      project: "tonchemy",
      reactComponentAnnotation: { enabled: true },
      telemetry: false,
    }),
  ],

  resolve: {
    alias: {
      // tmajs is not working with Cosmos, because cosmos app is running inside iframe and tma trying to override window.parent.postMessage, which is not allowed
      "@tma.js/sdk": process.env.IS_COSMOS
        ? resolve(__dirname, "./src/shared/utils/telegram/mock-tma.ts")
        : "@tma.js/sdk",
    },
  },

  base: "./",

  optimizeDeps: {
    exclude: process.env.IS_COSMOS ? ["sharp"] : ["js-big-decimal", "sharp"],
  },

  build: {
    sourcemap: true,
  },
});
