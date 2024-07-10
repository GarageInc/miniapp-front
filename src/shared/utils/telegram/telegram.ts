"use client";

import {
  mockTelegramEnv,
  parseInitData,
  postEvent,
  retrieveLaunchParams,
} from "@tma.js/sdk";

import { DEV_TG_DATA } from "@/shared/config";
import {
  extractValueFromHash,
  extractValueFromQuery,
  parseBase64,
} from "@/shared/utils/url";

if (DEV_TG_DATA) {
  mockTelegramEnv({
    themeParams: {
      accentTextColor: "#6ab2f2",
      bgColor: "#17212b",
      buttonColor: "#5288c1",
      buttonTextColor: "#ffffff",
      destructiveTextColor: "#ec3942",
      headerBgColor: "#17212b",
      hintColor: "#708499",
      linkColor: "#6ab3f3",
      secondaryBgColor: "#232e3c",
      sectionBgColor: "#17212b",
      sectionHeaderTextColor: "#6ab3f3",
      subtitleTextColor: "#708499",
      textColor: "#f5f5f5",
    },
    initData: parseInitData(DEV_TG_DATA),
    initDataRaw: DEV_TG_DATA,
    version: "7.2",
    platform: "tdesktop",
  });
}

if (!process.env.IS_COSMOS) {
  postEvent("web_app_expand");
  window.Telegram?.WebApp?.ready();
}

export function getTelegramInitData() {
  const { initDataRaw } = retrieveLaunchParams();

  return {
    initDataRaw: initDataRaw,
  };
}

export function getTelegramUserId() {
  const { initData } = retrieveLaunchParams();
  return initData?.user?.id as number;
}

type AppStartParams = {
  source?: string;
  ref?: string;
};

function getAppStartParams(): AppStartParams {
  const value =
    extractValueFromHash("tgWebAppStartParam") ??
    extractValueFromQuery("tgWebAppStartParam") ??
    "";

  const parsed = parseBase64(value);

  const params =
    value && Object.keys(parsed).length === 0
      ? {
          ref: value,
        }
      : parsed;

  return {
    ref: params?.ref ?? extractValueFromQuery("ref"),
    source: params?.source ?? extractValueFromQuery("source"),
  };
}

export const APP_START_PARAMS = getAppStartParams();

console.log("APP_START_PARAMS", APP_START_PARAMS);
