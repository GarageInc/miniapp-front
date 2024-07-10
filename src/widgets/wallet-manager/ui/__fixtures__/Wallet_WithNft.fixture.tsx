import { withMockServer } from "@/shared/api/fixtures/server";
import USER_WITH_INVENTORY from "@/shared/api/fixtures/user_full_inventory.json";
import TON_WALLETS_V2 from "@/shared/api/fixtures/wallets-v2.json";

import { WalletManager } from "../WalletManager";

export default withMockServer({
  routes: {
    get: {
      "/users/current": USER_WITH_INVENTORY,
      "https://raw.githubusercontent.com/ton-blockchain/wallets-list/main/wallets-v2.json":
        TON_WALLETS_V2,
    },
  },
})(WalletManager);
