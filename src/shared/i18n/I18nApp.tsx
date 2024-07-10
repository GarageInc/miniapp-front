import { ReactNode } from "react";
import { i18n } from "@lingui/core";
import { I18nProvider } from "@lingui/react";

// import { useUser } from "@/shared/api";
// import { defaultLocale, dynamicActivate, locales } from "./config";
// @ts-ignore
import { messages } from "./locales/en.po";

i18n.load("en", messages);
i18n.activate("en");

export const I18nWrap = ({ children }: { children: ReactNode }) => {
  // const { data: user } = useUser();
  // useEffect(() => {
  // dynamicActivate(validateLocale(user?.language || getSystemLocale()));
  // }, [user?.language]);

  return <I18nProvider i18n={i18n}>{children}</I18nProvider>;
};
//
// function getSystemLocale() {
//   return navigator.language.split("-")[0];
// }
//
// function validateLocale(locale: string) {
//   return Object.keys(locales).includes(locale) ? locale : defaultLocale;
// }
