import { TonClient } from "@ton/ton";

import { TONCENTER_API_KEY, TONCENTER_ENDPOINT } from "@/shared/config";

export function createTonClient() {
  return new TonClient({
    endpoint: TONCENTER_ENDPOINT,
    apiKey: TONCENTER_API_KEY,
  });
}
