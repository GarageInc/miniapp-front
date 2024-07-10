import { FC } from "react";
import { Trans } from "@lingui/macro";

import { MintArtifactButton } from "@/features/mint-artifact";
import { ElementCard, InventoryContainer } from "@/shared/ui/inventory";

import { useWallet } from "../model/hooks";

export const UserMintElements: FC = () => {
  const { mintItems } = useWallet();

  return (
    <div>
      <h1 className={`text-h1 font-display font-medium mb-4`}>
        <Trans>My Elements</Trans>
      </h1>
      <InventoryContainer>
        {mintItems.map((item) => (
          <ElementCard
            key={item.artifact.id}
            image={item.artifact.thumbnailUrl}
            name={item.artifact.name}
            level={item.artifact.level}
            quantity={item.count}
            // maxQuantity={item.maxAmount}
            coverColor={item.artifact.backgroundColor}
            borderColor={item.artifact.strokeColor}
            buttons={
              <>
                <MintArtifactButton
                  artifact={item.artifact}
                  disabled={item.count === 0}
                  size="sm"
                  color="green"
                  className="!h-auto py-2 !leading-4"
                >
                  <span className="text-t3">
                    <Trans>Mint to {item.artifact.mintingPrice} TON</Trans>
                  </span>
                </MintArtifactButton>
              </>
            }
          />
        ))}
      </InventoryContainer>
    </div>
  );
};
