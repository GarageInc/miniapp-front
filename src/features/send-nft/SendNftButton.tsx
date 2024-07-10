import { FC, useState } from "react";
import { Trans } from "@lingui/macro";

import GameEvents from "@/shared/analytics/GameEvents";
import { useInvalidateAfterSendNft, useSendNft } from "@/shared/ton";
import { Button, ButtonProps } from "@/shared/ui/forms";

import { SendNftDialog } from "./SendNftDialog";

export type SendNftButtonProps = {
  artifact: API.Artifact;
  onSendCompleted?: (isSuccess: boolean) => void;
  nft: API.NftItem;
} & Partial<ButtonProps>;

export const SendNftButton: FC<SendNftButtonProps> = ({
  artifact,
  onSendCompleted,
  onClick,
  children,
  nft,
  ...props
}) => {
  const [isOpened, setIsOpened] = useState(false);

  const { mutateAsync, isPending, isSuccess, reset } = useSendNft();

  const invalidateWallet = useInvalidateAfterSendNft();

  const open = () => {
    setIsOpened(true);
  };
  const close = () => {
    reset();
    setIsOpened(false);
    onSendCompleted?.(false);
    // invalidate after closing because if we do it before, then button will disappear(collection of nfts will be updated and remove this button from dom)
    invalidateWallet();
  };
  const submit = (toAddress: string) => {
    mutateAsync({ toAddress, nftAddress: nft.address })
      .then(() => {
        onSendCompleted?.(true);
        GameEvents.successSend(nft.index);
      })
      .catch((err) => {
        onSendCompleted?.(false);
        console.error(err);
      });

    GameEvents.tapButtonSend2(nft.index);
  };

  return (
    <>
      <Button
        color="purple"
        {...props}
        onClick={(event) => {
          onClick?.(event);
          open();
          GameEvents.tapButtonSend1(nft.index);
        }}
      >
        {children || <Trans>Use</Trans>}
      </Button>
      {isOpened && (
        <SendNftDialog
          artifact={artifact}
          isSuccess={isSuccess}
          isPending={isPending}
          isOpen
          onRequestClose={close}
          onCancel={close}
          onSubmit={submit}
        />
      )}
    </>
  );
};
