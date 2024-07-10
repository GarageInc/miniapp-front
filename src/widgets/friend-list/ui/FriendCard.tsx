import { FC } from "react";
import { Trans } from "@lingui/macro";

import { GameEvents } from "@/shared/analytics/GameEvents";
import { Avatar } from "@/shared/ui/display/Avatar";
import { ElementsCounter } from "@/shared/ui/display/ElementsCounter";
import { Paper } from "@/shared/ui/display/Paper";
import { Button } from "@/shared/ui/forms";

import { FriendData, useFriendsStore } from "../model/store";

export const FriendCard: FC<FriendCardProps> = ({ friend }) => {
  const { selectFriend } = useFriendsStore();
  return (
    <Paper variant="transculent" className="flex space-x-2.5 items-center">
      <Avatar pictureUrl={friend.avatarUrl} />
      <div className="overflow-hidden flex-1">
        <div className="text-h4 font-medium text-ellipsis overflow-hidden text-nowrap">
          {friend.name}
        </div>
        <div className="text-t4 font-bold uppercase text-white/[.6] mt-1">
          <Trans>LVL {friend.level}</Trans>
        </div>
      </div>
      {friend.score && (
        <ElementsCounter current={friend.score} total={friend.maxScore} />
      )}
      <Button
        color="gray"
        size="md"
        onClick={() => {
          selectFriend(friend.id);
          GameEvents.clickViewFriend(friend.name);
        }}
      >
        <Trans>View</Trans>
      </Button>
    </Paper>
  );
};

export type FriendCardProps = {
  friend: FriendData;
};
