import { useEffect, useMemo, useState } from "react";
import { Trans } from "@lingui/macro";

import { verifyTonAddress } from "@/shared/ton";
import { Input } from "@/shared/ui/forms";
import { ElementCard } from "@/shared/ui/inventory";
import {
  StatusDialog,
  StatusDialogProps,
} from "@/shared/ui/navigation/StatusDialog";

export type SendNftDialogProps = {
  isSuccess: boolean;
  artifact: API.Artifact;
  isPending: boolean;
  onSubmit: (recipientAddress: string) => void;
} & Omit<StatusDialogProps, "children" | "title" | "onSubmit">;

export const SendNftDialog = ({
  isSuccess,
  artifact,
  isPending,
  isOpen,
  onSubmit,
  ...props
}: SendNftDialogProps) => {
  const [address, setAddress] = useState("");
  const isAddressValid = useMemo(
    () => (address?.length > 0 ? verifyTonAddress(address) : true),
    [address]
  );

  useEffect(() => {
    if (isOpen) {
      setAddress("");
    }
  }, [isOpen]);

  return (
    <StatusDialog
      {...props}
      isOpen={isOpen}
      title={isSuccess ? <Trans>Congratulations!</Trans> : <Trans>Send!</Trans>}
      iconVariant={isSuccess ? "success" : "ton"}
      description={
        isSuccess ? (
          <Trans>NFT send successfully</Trans>
        ) : (
          <Trans>Send NFT to address</Trans>
        )
      }
      submitText={isSuccess ? "" : <Trans>Continue</Trans>}
      cancelText={
        isSuccess ? <Trans>Tap to continue</Trans> : <Trans>Cancel</Trans>
      }
      bg={isSuccess ? "success" : "blue"}
      buttonLayout="horizontal"
      cancelButtonProps={{
        disabled: isPending,
      }}
      submitButtonProps={{
        disabled: isPending || !isAddressValid,
      }}
      onSubmit={() => {
        onSubmit(address);
      }}
      {...props}
    >
      <div className="flex flex-col w-full items-center space-y-6">
        {!isSuccess && (
          <div className="relative">
            <div className="w-[300px]">
              <Input
                label={<Trans>Address</Trans>}
                autoFocus
                value={address}
                onChange={(event) => setAddress(event.target.value)}
                name="address"
                isInvalid={!isAddressValid}
              />
            </div>
            {!isAddressValid && (
              <div className="absolute top-[100%] pt-1 text-[#E53B45] text-t3 font-medium">
                <Trans>Invalid address</Trans>
              </div>
            )}
          </div>
        )}
        <ElementCard
          larger
          image={artifact.gifUrl}
          blurredImage={artifact.thumbnailUrl}
          fallbackImage={artifact.thumbnailUrl}
          name={artifact.name}
          level={artifact.level}
          coverColor={artifact.backgroundColor}
          borderColor={artifact.strokeColor}
        />
      </div>
    </StatusDialog>
  );
};
