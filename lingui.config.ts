import type { LinguiConfig } from "@lingui/conf";

const config: LinguiConfig = {
  locales: ["en", "ru"],
  sourceLocale: "en",
  catalogs: [
    {
      path: "<rootDir>/src/shared/i18n/locales/{locale}",
      include: ["src"],
      exclude: ["**/node_modules/**"],
    },
  ],
  format: "po",
};

export default config;
