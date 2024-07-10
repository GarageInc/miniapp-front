export const IS_DEV: boolean = import.meta.env.DEV;
export const IS_PROD: boolean = import.meta.env.PROD;
export const IS_DEBUG: boolean = Boolean(import.meta.env.DEBUG_ENABLED);

export const API_BASE_URL = import.meta.env.VITE_API_URL as string;

export const YANDEX_METRIKA_ID = import.meta.env.VITE_YM_ID as number;

export const TON_WALLET_MANIFEST_URL = import.meta.env
  .VITE_TON_CONNECT_MANIFEST_URL as string;

const VITE_IS_TON_PRODUCTION = import.meta.env.VITE_IS_TON_PRODUCTION as string;
export const TONCENTER_ENDPOINT =
  VITE_IS_TON_PRODUCTION === "true"
    ? "https://toncenter.com/api/v2/jsonRPC"
    : "https://testnet.toncenter.com/api/v2/jsonRPC";

export const TONCENTER_API_KEY = import.meta.env.VITE_TON_API_KEY as string;

export const NFT_COLLECTION_URL =
  (import.meta.env.VITE_NFT_COLLECTION_URL as string) ||
  // TODO remove after adding env to CI
  "https://testnet.getgems.io/collection/EQB9xuN3_geUrTJuZxmtkti4fo_TywEs0I35SDI9V-TmM7Dt";
export const NFT_COLLECTION_ADDRESS =
  (import.meta.env.VITE_NFT_COLLECTION_ADDRESS as string) ||
  // TODO remove after adding env to CI
  "EQB9xuN3_geUrTJuZxmtkti4fo_TywEs0I35SDI9V-TmM7Dt";

export const GAS_FEE = (import.meta.env.VITE_GAS_FEE as string) || "0.01";

export const NFT_FORWARD_AMOUNT =
  (import.meta.env.VITE_NFT_FORWARD_AMOUNT as string) || "0.05";

export const NFT_BURN_ADDRESS = import.meta.env.VITE_NFT_BURN_ADDRESS as string;

export const DEV_TG_DATA = import.meta.env.VITE_TG_DATA as string;

export const GA_KEY = import.meta.env.VITE_GA_KEY as string;

export const GA_SECRET = import.meta.env.VITE_GA_SECRET as string;

export const GA_BUILD = import.meta.env.VITE_GA_BUILD as string;

export const SENTRY_DSN = import.meta.env.VITE_SENTRY_DSN as string;

const ALL_VARS = {
  IS_DEV,
  IS_PROD,
  API_BASE_URL,
  YANDEX_METRIKA_ID,
  TON_WALLET_MANIFEST_URL,
  TONCENTER_ENDPOINT,
  TONCENTER_API_KEY,
  NFT_COLLECTION_URL,
  NFT_COLLECTION_ADDRESS,
  GAS_FEE,
  NFT_FORWARD_AMOUNT,
  NFT_BURN_ADDRESS,
  VITE_TG_DATA: DEV_TG_DATA,
  VITE_IS_TON_PRODUCTION,
  GA_BUILD,
};

if (IS_DEBUG) {
  console.log(ALL_VARS);
}
