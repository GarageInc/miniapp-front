import { FC } from "react";
import { Trans } from "@lingui/macro";

import { useEventTapInviteFriends } from "@/shared/analytics/hooks";
import { useGenerateRefCode } from "@/shared/api";
import { Button, ButtonProps } from "@/shared/ui/forms";

export function useFriendInviteButton(_gaScreen: string) {
  const { mutateAsync: generateRefCode } = useGenerateRefCode();
  const { sendEvent } = useEventTapInviteFriends(_gaScreen);

  return () => {
    generateRefCode()
      .then(() => {
        window.Telegram.WebApp.close();
      })
      .catch(console.error);
    sendEvent();
  };
}

export const FriendInviteButton: FC<{ _gaScreen: string } & ButtonProps> = ({
  onClick,
  _gaScreen,
  ...props
}) => {
  const handleFriendInvite = useFriendInviteButton(_gaScreen);
  return (
    <Button
      {...props}
      onClick={(event) => {
        onClick?.(event);
        handleFriendInvite();
      }}
    >
      {props.children || <Trans>Invite</Trans>}
    </Button>
  );
};
