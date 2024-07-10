import axios, { AxiosRequestConfig } from "axios";

import { API_BASE_URL } from "@/shared/config";
import { APP_START_PARAMS, getTelegramInitData } from "@/shared/utils/telegram";

const headers = {
  Authorization: `TelegramAuth ${getTelegramInitData().initDataRaw}`,
  TonchemyRef: APP_START_PARAMS.ref,
  TonchemySrc: APP_START_PARAMS.source,
};

const axiosInstance = axios.create({
  responseType: "json",
  baseURL: API_BASE_URL,
  headers: headers,
});

async function request<TResult>(config: AxiosRequestConfig) {
  try {
    const resp = await axiosInstance.request(config);

    return resp.data as TResult;
  } catch (err) {
    console.error("Error while sending request", err);
    throw err;
  }
}

export async function getJson<TResult = unknown>(url: string) {
  return request<TResult>({ url });
}

export async function postJson<TResult = unknown>(url: string, data?: object) {
  return request<TResult>({
    method: "POST",
    url,
    data,
  });
}
