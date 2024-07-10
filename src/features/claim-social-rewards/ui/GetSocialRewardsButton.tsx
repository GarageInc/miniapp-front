import { Trans } from "@lingui/macro";

import { Button, ButtonProps } from "@/shared/ui/forms";

import { useSocialRewards } from "../model/hooks";

import { GiftIconShaking } from "./GiftIconShaking";

export const GetSocialRewardsButton = (props: ButtonProps) => {
  const { totalBatchesAvailable, openClaimRewards } = useSocialRewards();

  if (!totalBatchesAvailable) {
    return null;
  }

  return (
    <Button {...props} color="purple" onClick={openClaimRewards}>
      <div className="flex items-center space-x-2">
        <span>
          <Trans>Rewards</Trans>
        </span>
        <GiftIconShaking />
      </div>
    </Button>
  );
};
