import { useSocialRewards } from "../model/hooks";

import { GiftIconShaking } from "./GiftIconShaking";

export const SocialRewardsIndicator = () => {
  const { totalBatchesAvailable } = useSocialRewards();

  if (totalBatchesAvailable > 0) {
    return <GiftIconShaking />;
  }

  return null;
};
