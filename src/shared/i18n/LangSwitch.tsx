import { useLingui } from "@lingui/react";

import { useChangeLanguage } from "../api";

import { FLAGS, locales } from "./config";

export function LangSwitch() {
  const { i18n } = useLingui();
  const { mutateAsync } = useChangeLanguage();
  return (
    <div>
      {Object.keys(locales)
        .filter((loc) => loc !== i18n.locale)
        .map((locale) => (
          <button
            type="button"
            onClick={() => {
              mutateAsync(locale).then(() => {
                window.location.reload();
              });
            }}
            key={locale}
          >
            {FLAGS[locale]}
          </button>
        ))}
    </div>
  );
}
