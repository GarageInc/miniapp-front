import copy from "copy-to-clipboard";
import { FC, useEffect, useState } from "react";
import { Trans } from "@lingui/macro";

import { Paper } from "@/shared/ui/display/Paper";
import { Button } from "@/shared/ui/forms";
import { CopyIcon, IllustrationIcon } from "@/shared/ui/icons";
import { Tooltip } from "@/shared/ui/overlays/Tooltip";

import { useWallet } from "../model/hooks";

import { UserMintElements } from "./UserMintElements";
import { UserNfts } from "./UserNfts";
import { ViewCollectionButton } from "./ViewCollectionButton";
import { WalletConnectButton } from "./WalletConnectButton";
import { WalletDisconnectButton } from "./WalletDisconnectButton";

export const WalletManager: FC = () => {
  const {
    address,
    balance,
    isLoaded,
    isWalletConnected,
    isMintMode,
    toggleMintMode,
  } = useWallet();

  return (
    <div className="relative px-3 pt-4 pb-12 w-full h-full overflow-y-auto bg-center bg-sunburst-purple bg-fixed bg-cover bg-no-repeat">
      {isLoaded && (
        <div className="w-full flex flex-col space-y-2.5">
          <div className="grid grid-cols-2 gap-2.5">
            <ViewCollectionButton />
            {isWalletConnected ? (
              <WalletDisconnectButton />
            ) : (
              <WalletConnectButton />
            )}
          </div>
          <Paper
            variant="transculent"
            className="w-full flex justify-between items-center font-medium font-display leading-tight"
          >
            <div>
              <Trans>Balance:</Trans>
            </div>
            <div className="flex items-center space-x-1">
              <IllustrationIcon variant="ton" className="w-[18px]" />
              <div>{isWalletConnected ? balance : "---"} TON</div>
            </div>
          </Paper>
          <WalletAddress address={address} />
          <Button
            onClick={toggleMintMode}
            color={isMintMode ? "gray" : "purple"}
            disabled={!isWalletConnected}
          >
            {isMintMode ? <Trans>Stop mint</Trans> : <Trans>Mint</Trans>}
          </Button>

          <div className="pt-5">
            {isMintMode ? <UserMintElements /> : <UserNfts />}
          </div>
        </div>
      )}
    </div>
  );
};

const WalletAddress: FC<{ address?: string }> = ({ address }) => {
  const [isOpen, setOpen] = useState(false);

  const handleCopy = () => {
    if (address) {
      copy(address);
      setOpen(true);
    }
  };

  useEffect(() => {
    let t: NodeJS.Timeout;
    if (isOpen) {
      t = setTimeout(() => {
        setOpen(false);
      }, 3000);
    }

    return () => {
      clearTimeout(t);
    };
  }, [isOpen]);

  return (
    <Paper
      variant="transculent"
      className="w-full flex justify-between items-center gap-4"
    >
      <div className="overflow-hidden">
        <div className="font-display font-medium leading-tight">
          <Trans>Address:</Trans>
        </div>
        <div className="text-ellipsis text-nowrap overflow-hidden text-sm">
          {address || "–"}
        </div>
      </div>
      <Tooltip
        content={
          <span>
            <Trans>Copied</Trans>
          </span>
        }
        isOpen={isOpen}
        onChangeOpen={setOpen}
      >
        <Button
          color="gray"
          size="md"
          icon={<CopyIcon />}
          disabled={!address}
          onClick={handleCopy}
        />
      </Tooltip>
    </Paper>
  );
};
