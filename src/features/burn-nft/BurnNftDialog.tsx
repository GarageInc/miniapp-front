import { Trans } from "@lingui/macro";

import { ElementCard } from "@/shared/ui/inventory";
import {
  StatusDialog,
  StatusDialogProps,
} from "@/shared/ui/navigation/StatusDialog";

export type BurnNftDialogProps = {
  isSuccess: boolean;
  artifact: API.Artifact;
  isPending: boolean;
} & Omit<StatusDialogProps, "children" | "title">;

export const BurnNftDialog = ({
  isSuccess,
  artifact,
  isPending,
  ...props
}: BurnNftDialogProps) => {
  return (
    <StatusDialog
      {...props}
      title={isSuccess ? <Trans>Congratulations!</Trans> : <Trans>Use!</Trans>}
      iconVariant={isSuccess ? "success" : "ton"}
      secondTitle={
        isSuccess ? (
          <Trans>Successfully burned NFT</Trans>
        ) : (
          <Trans>Burn this NFT and Use in game progress</Trans>
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
              The Element will arrive in your inventory within a few minutes
            </Trans>
          </div>
        )}
      </div>
    </StatusDialog>
  );
};
