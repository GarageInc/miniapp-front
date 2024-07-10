import { Trans } from "@lingui/macro";

import { SocialRewardsIndicator } from "@/features/claim-social-rewards";
import { ROUTES } from "@/shared/routing";
import { TabBar, TabBarItem } from "@/shared/ui/navigation";

export const MainTabBar = () => {
  return (
    <TabBar className="w-full z-10">
      <TabBarItem to={ROUTES.craft} iconVariant="craft">
        <Trans>Craft</Trans>
      </TabBarItem>
      <TabBarItem
        to={ROUTES.friends}
        iconVariant="friends"
        indicator={<SocialRewardsIndicator />}
      >
        <Trans>Friends</Trans>
      </TabBarItem>
      <TabBarItem to={ROUTES.leaderboards} iconVariant="leaderboard">
        <Trans>Leaders</Trans>
      </TabBarItem>
      <TabBarItem to={ROUTES.wallet} iconVariant="wallet">
        <Trans>Wallet</Trans>
      </TabBarItem>
    </TabBar>
  );
};
