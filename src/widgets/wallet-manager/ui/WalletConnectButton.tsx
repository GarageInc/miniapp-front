import { FC } from "react";
import { Trans } from "@lingui/macro";

import GameEvents from "@/shared/analytics/GameEvents";
import { useWalletConnect } from "@/shared/ton";
import { Button, ButtonProps } from "@/shared/ui/forms";

export const WalletConnectButton: FC<Partial<ButtonProps>> = (props) => {
  const { connect } = useWalletConnect();

  return (
    <Button
      color="purple"
      {...props}
      onClick={() => {
        connect();
        GameEvents.connectWalletTap();
      }}
    >
      <Trans>Connect</Trans>
    </Button>
  );
};
