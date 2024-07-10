import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Trans } from "@lingui/macro";

import GameEvents from "@/shared/analytics/GameEvents";
import { ROUTES } from "@/shared/routing";
import { useMint, useWalletInfo } from "@/shared/ton";
import { Button, ButtonProps } from "@/shared/ui/forms";

import { MintNftDialog } from "./MintNftDialog";

export type MintArtifactButtonProps = {
  artifact: API.Artifact;
  onMintDialogClose?: () => void;
  onMintSuccess?: () => void;
} & Partial<ButtonProps>;

export const MintArtifactButton: FC<MintArtifactButtonProps> = ({
  artifact,
  onMintSuccess,
  onMintDialogClose,
  onClick,
  children,
  ...props
}) => {
  const [isOpened, setIsOpened] = useState(false);
  const navigate = useNavigate();
  const { data: wallet } = useWalletInfo();

  const {
    mutateAsync: mintAsync,
    isPending,
    isSuccess,
    reset,
  } = useMint({
    address: wallet?.address ?? "",
    artifactId: artifact.id,
    mintPrice: artifact.mintingPrice,
  });

  const open = () => {
    setIsOpened(true);
  };
  const close = () => {
    reset();
    setIsOpened(false);
    onMintDialogClose?.();
  };
  const submit = () => {
    GameEvents.tapButtonMintContinue(artifact.id);
    mintAsync()
      .then(() => {
        onMintSuccess?.();
        GameEvents.successMint(artifact.id);
      })
      .catch((err) => {
        console.error(err);
      });
  };
  const cancel = () => {
    close();
    onMintDialogClose?.();
    GameEvents.tapButtonMintCancel(artifact.id);
  };

  return (
    <>
      <Button
        color="purple"
        {...props}
        onClick={(event) => {
          if (!wallet) {
            navigate("/" + ROUTES.wallet);
            return;
          }
          onClick?.(event);
          open();
        }}
      >
        {children || <Trans>Mint</Trans>}
      </Button>
      {isOpened && (
        <MintNftDialog
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
