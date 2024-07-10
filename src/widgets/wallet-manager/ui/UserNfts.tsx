import { FC } from "react";
import { Trans } from "@lingui/macro";

import { BurnNftButton } from "@/features/burn-nft";
import { SendNftButton } from "@/features/send-nft";
import { IllustrationIcon } from "@/shared/ui/icons";
import { ElementCard, InventoryContainer } from "@/shared/ui/inventory";

import { useWallet } from "../model/hooks";

export const UserNfts: FC = () => {
  const { nftCollection, beginSendNft, address, isWalletConnected } =
    useWallet();
  const isEmpty = nftCollection.length === 0;

  let content = <div />;
  if (!isWalletConnected) {
    content = <NotConnectedList />;
  } else if (isEmpty) {
    content = <EmptyList />;
  } else {
    content = (
      <InventoryContainer>
        {nftCollection.map((item) => (
          <ElementCard
            key={item.id}
            image={item.artifact.thumbnailUrl}
            name={item.artifact.name}
            level={item.artifact.level}
            coverColor={item.artifact.backgroundColor}
            borderColor={item.artifact.strokeColor}
            buttons={
              <>
                <SendNftButton
                  size="sm"
                  color="green"
                  onClick={() => beginSendNft(item.id)}
                  artifact={item.artifact}
                  nft={item.nft}
                >
                  <Trans>Send</Trans>
                </SendNftButton>
                <BurnNftButton
                  size="sm"
                  color="purple"
                  artifact={item.artifact}
                  nft={item.nft}
                  ownerAddress={address}
                >
                  <Trans>Use</Trans>
                </BurnNftButton>
              </>
            }
          />
        ))}
      </InventoryContainer>
    );
  }
  return (
    <div>
      <h1
        className={`text-h1 font-display font-medium mb-4 ${isEmpty ? "text-center" : ""}`}
      >
        <Trans>My NFT</Trans>
      </h1>
      {content}
    </div>
  );
};

const EmptyList: FC = () => {
  return (
    <div className="flex flex-col items-center">
      <IllustrationIcon variant="wallet" larger className="w-[128px]" />
      <div className="text-center text-t2 mt-2">
        <Trans>
          You don’t have any NFTs available. <br /> You can mint NFTs or buy on
          the getgems
        </Trans>
      </div>
    </div>
  );
};

const NotConnectedList: FC = () => {
  return (
    <div className="flex flex-col items-center">
      <IllustrationIcon variant="wallet" larger className="w-[128px]" />
      <div className="text-center text-t2 mt-2">
        <Trans>Connect wallet to mint and trade</Trans>
      </div>
    </div>
  );
};
