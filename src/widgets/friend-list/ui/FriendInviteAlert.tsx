import { FC } from "react";
import { Trans } from "@lingui/macro";

import { FriendInviteButton } from "@/features/friend-invite";
import { GameEvents } from "@/shared/analytics/GameEvents";
import { Paper } from "@/shared/ui/display/Paper";

export const FriendInviteAlert: FC = () => {
  return (
    <Paper variant="solid">
      <div className="flex flex-col items-center space-y-2 p-2">
        <p className="text-t2 text-center mb-2">
          <Trans>
            Invite more friends and get additional slots with rewards boxes and
            speed up the cooldown of rewards.
          </Trans>
        </p>
        <FriendInviteButton
          color="purple"
          size="md"
          _gaScreen="Friends"
          onClick={GameEvents.clickFriendsInviteAlert}
        >
          <Trans>Invite new friend</Trans>
        </FriendInviteButton>
      </div>
    </Paper>
  );
};
