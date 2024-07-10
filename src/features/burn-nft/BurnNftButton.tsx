import { FC, useState } from "react";
import { Trans } from "@lingui/macro";

import GameEvents from "@/shared/analytics/GameEvents";
import { useBurnNft } from "@/shared/ton";
import { Button, ButtonProps } from "@/shared/ui/forms";

import { BurnNftDialog } from "./BurnNftDialog";

export type BurnNftButtonProps = {
  artifact: API.Artifact;
  onBurnCompleted?: (isSuccess: boolean) => void;
  nft: API.NftItem;
  ownerAddress: string;
} & Partial<ButtonProps>;

export const BurnNftButton: FC<BurnNftButtonProps> = ({
  artifact,
  onBurnCompleted,
  onClick,
  children,
  ownerAddress,
  nft,
  ...props
}) => {
  const [isOpened, setIsOpened] = useState(false);

  const { mutateAsync, isPending, isSuccess, reset } = useBurnNft({
    nftAddress: nft.address,
    nftIndex: nft.index,
    ownerAddress: ownerAddress,
  });

  const open = () => {
    setIsOpened(true);
  };
  const close = () => {
    reset();
    setIsOpened(false);
    onBurnCompleted?.(false);
  };
  const submit = () => {
    GameEvents.tapButtonUse2(artifact.id);
    mutateAsync()
      .then(() => {
        onBurnCompleted?.(true);
        GameEvents.successUsed(artifact.id);
      })
      .catch((err) => {
        onBurnCompleted?.(false);
        console.error(err);
      });
  };

  const cancel = () => {
    close();
    GameEvents.tapButtonUseCancel(artifact.id);
  };

  return (
    <>
      <Button
        color="purple"
        {...props}
        onClick={(event) => {
          onClick?.(event);
          open();
          GameEvents.tapButtonUse1(artifact.id);
        }}
      >
        {children || <Trans>Use</Trans>}
      </Button>
      {isOpened && (
        <BurnNftDialog
          artifact={artifact}
          isSuccess={isSuccess}
          isPending={isPending}
          isOpen
          onRequestClose={close}
          onCancel={cancel}
          onSubmit={submit}
        />
      )}
    </>
  );
};
