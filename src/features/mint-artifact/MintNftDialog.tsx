import { Trans } from "@lingui/macro";

import { ElementCard } from "@/shared/ui/inventory";
import {
  StatusDialog,
  StatusDialogProps,
} from "@/shared/ui/navigation/StatusDialog";

export type MintNftDialogProps = {
  isSuccess: boolean;
  artifact: API.Artifact;
  isPending: boolean;
} & Omit<StatusDialogProps, "children" | "title">;

export const MintNftDialog = ({
  isSuccess,
  artifact,
  isPending,
  ...props
}: MintNftDialogProps) => {
  return (
    <StatusDialog
      {...props}
      title={isSuccess ? <Trans>Congratulations!</Trans> : <Trans>Mint!</Trans>}
      iconVariant={isSuccess ? "success" : "ton"}
      secondTitle={
        isSuccess ? (
          <Trans>Successfully minted NFT</Trans>
        ) : (
          <Trans>The cost of mint NFT is {artifact.mintingPrice} TON</Trans>
        )
      }
      submitText={isSuccess ? "" : <Trans>Continue</Trans>}
      submitButtonProps={{
        disabled: isPending,
      }}
      cancelText={
        isSuccess ? <Trans>Tap to continue</Trans> : <Trans>Cancel</Trans>
      }
      cancelButtonProps={{
        disabled: isPending,
      }}
      buttonLayout="horizontal"
      bg={isSuccess ? "success" : "blue"}
    >
      <div className="flex flex-col w-full items-center space-y-6">
        <ElementCard
          key={artifact.id}
          larger
          image={artifact.gifUrl}
          blurredImage={artifact.thumbnailUrl}
          fallbackImage={artifact.thumbnailUrl}
          name={artifact.name}
          level={artifact.level}
          coverColor={artifact.backgroundColor}
          borderColor={artifact.strokeColor}
        />
        {isSuccess && (
          <div className="mt-4 text-t2 text-center max-w-[200px]">
            <Trans>
              The NFT will arrive in your wallet within a few minutes
            </Trans>
          </div>
        )}
      </div>
    </StatusDialog>
  );
};
