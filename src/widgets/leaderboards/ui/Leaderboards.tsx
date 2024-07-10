import { ReactNode } from "react";
import { Trans } from "@lingui/macro";

import {
  useCraftLeaderboard,
  useLevelLeaderboard,
  useReferrersLeaderboard,
  useUser,
} from "@/shared/api";
import { TabItem, Tabs } from "@/shared/ui/navigation";
import { formatPersonName } from "@/shared/utils/formatPersonName";

import { LeaderboardItem } from "./LeaderboardItem";

export const Leaderboards = () => {
  const bgCls = "bg-center bg-sunburst-purple bg-cover bg-no-repeat";

  return (
    <div className={`p-3 h-full w-full overflow-y-auto ${bgCls}`}>
      <Tabs>
        <TabItem content={<TopCrafters />}>
          <Trans>Elements</Trans>
        </TabItem>
        <TabItem content={<TopReferrers />}>
          <Trans>Friends</Trans>
        </TabItem>
        <TabItem content={<TopLevelPlayers />}>
          <Trans>Level</Trans>
        </TabItem>
      </Tabs>
    </div>
  );
};

export const TopLevelPlayers = () => {
  const { data } = useLevelLeaderboard();
  const { data: currentUser } = useUser();

  return (
    <ListContainer>
      {data?.map(
        ({ id, level, photoUrl, username, first_name, last_name }, idx) => (
          <LeaderboardItem
            key={id}
            position={idx + 1}
            level={level}
            avatarUrl={photoUrl}
            name={formatPersonName({
              firstName: first_name,
              lastName: last_name,
              username,
            })}
            scoreValue={level}
            isCurrentUser={currentUser?.username === username}
            scoreIcon="topStar"
          />
        )
      )}
    </ListContainer>
  );
};

export const TopCrafters = () => {
  const { data } = useCraftLeaderboard();
  const { data: currentUser } = useUser();

  return (
    <ListContainer>
      {data?.map(
        (
          {
            id,
            photoUrl,
            username,
            first_name,
            last_name,
            craftedAmount,
            level,
          },
          idx
        ) => (
          <LeaderboardItem
            key={id}
            position={idx + 1}
            avatarUrl={photoUrl}
            name={formatPersonName({
              firstName: first_name,
              lastName: last_name,
              username,
            })}
            scoreValue={craftedAmount}
            isCurrentUser={currentUser?.username === username}
            level={level}
            scoreIcon="elements"
          />
        )
      )}
    </ListContainer>
  );
};

export const TopReferrers = () => {
  const { data } = useReferrersLeaderboard();
  const { data: currentUser } = useUser();

  return (
    <ListContainer>
      {data?.map(
        (
          {
            id,
            photoUrl,
            username,
            invitedUsersAmount,
            first_name,
            last_name,
            level,
          },
          idx
        ) => (
          <LeaderboardItem
            key={id}
            position={idx + 1}
            avatarUrl={photoUrl}
            name={formatPersonName({
              firstName: first_name,
              lastName: last_name,
              username,
            })}
            scoreValue={invitedUsersAmount}
            isCurrentUser={currentUser?.username === username}
            level={level}
            scoreIcon="topFriends"
          />
        )
      )}
    </ListContainer>
  );
};

function ListContainer({ children }: { children: ReactNode }) {
  return <div className="flex flex-col space-y-2">{children}</div>;
}
