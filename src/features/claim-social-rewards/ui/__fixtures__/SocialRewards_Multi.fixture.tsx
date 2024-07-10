import { withMockServer } from "@/shared/api/fixtures/server";
import REWARDS_DATA from "@/shared/api/fixtures/social-rewards-multiple.json";
import USER_WITH_INVENTORY from "@/shared/api/fixtures/user_full_inventory.json";

import { GetSocialRewardsButton } from "../GetSocialRewardsButton";
import { SocialRewardsNotification } from "../SocialRewardsNotification";

const state = {
  user: {
    ...USER_WITH_INVENTORY,
    claimableRewardsAmount: REWARDS_DATA.batchRewards.length,
  },
  rewards: REWARDS_DATA.batchRewards,
};

export default withMockServer({
  routes: {
    get: {
      "/users/current": () => state.user,
      "/referrals/claimable-bonuses": () => ({ batchRewards: state.rewards }),
    },
    post: {
      "/referrals/claim-batch-bonuses": (req) => {
        const batchIds = JSON.parse(req.requestBody).batchIds as string[];
        state.rewards = state.rewards.filter((x) => !batchIds.includes(x._id));
        state.user = {
          ...state.user,
          claimableRewardsAmount: state.rewards.length,
        };
        return {
          user: state.user,
        };
      },
    },
  },
})(() => {
  return (
    <>
      <GetSocialRewardsButton />
      <SocialRewardsNotification />
    </>
  );
});
