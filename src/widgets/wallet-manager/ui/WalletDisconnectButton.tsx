import { FC } from "react";
import { Trans } from "@lingui/macro";

import { useWalletConnect } from "@/shared/ton";
import { Button, ButtonProps } from "@/shared/ui/forms";

export const WalletDisconnectButton: FC<Partial<ButtonProps>> = (props) => {
  const { disconnect } = useWalletConnect();

  return (
    <Button color="red" {...props} onClick={disconnect}>
      <div className="text-h4">
        <Trans>Disconnect</Trans>
      </div>
    </Button>
  );
};
