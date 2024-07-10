import { withMockServer } from "@/shared/api/fixtures/server";
import REWARDS_DATA from "@/shared/api/fixtures/social-rewards-overflow-multiple.json";
import USER_WITH_INVENTORY from "@/shared/api/fixtures/user_full_inventory.json";

import { SocialRewardsNotification } from "../SocialRewardsNotification";

export default withMockServer({
  routes: {
    get: {
      "/users/current": USER_WITH_INVENTORY,
      "/referrals/claimable-bonuses": REWARDS_DATA,
    },
    post: {
      "/referrals/claim-batch-bonuses": { user: USER_WITH_INVENTORY },
    },
  },
})(SocialRewardsNotification);
