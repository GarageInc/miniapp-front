import { FC } from "react";
import { Trans } from "@lingui/macro";

import { useFriendInviteButton } from "@/features/friend-invite";
import { GameEvents } from "@/shared/analytics/GameEvents";
import { TabItem, Tabs } from "@/shared/ui/navigation";
import { FriendsList } from "@/widgets/friend-list";
import { TopCrafters } from "@/widgets/leaderboards";

export const LeaderboardsPage: FC = () => {
  const handleFriendInvite = useFriendInviteButton("Friends");
  const bgCls = "bg-center bg-sunburst-purple bg-cover bg-no-repeat";

  return (
    <div className={`p-3 h-full w-full overflow-y-auto ${bgCls}`}>
      <Tabs className="h-full">
        <TabItem content={<TopCrafters />} onClick={GameEvents.clickLadderAll}>
          <Trans>All</Trans>
        </TabItem>
        <TabItem
          content={<FriendsList />}
          onClick={GameEvents.clickLadderFriends}
        >
          <Trans>Friends</Trans>
        </TabItem>
        <TabItem
          content={<div />}
          color="yellow"
          onClick={(e) => {
            e.preventDefault();
            handleFriendInvite();
            GameEvents.clickLadderInviteButton();
          }}
        >
          <span className="whitespace-nowrap text-black">
            <Trans>Invite friend +</Trans>
          </span>
        </TabItem>
      </Tabs>
    </div>
  );
};
