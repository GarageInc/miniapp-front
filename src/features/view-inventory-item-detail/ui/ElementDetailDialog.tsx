import { FC } from "react";
import { Trans } from "@lingui/macro";

import { useListPairsForArtifact } from "@/shared/api";
import { Collapsible } from "@/shared/ui/display/Collapsible";
import { Paper } from "@/shared/ui/display/Paper";
import { PlusIcon } from "@/shared/ui/icons";
import { ElementCard } from "@/shared/ui/inventory";
import { StatusDialog } from "@/shared/ui/navigation/StatusDialog";

export type ElementDetailDialogProps = {
  artifact: API.Artifact | null;
  isOpen: boolean;
  onClose: () => void;
};

export const ElementDetailDialog: FC<ElementDetailDialogProps> = ({
  artifact,
  isOpen,
  onClose,
}: ElementDetailDialogProps) => {
  const { data: recipes = [] } = useListPairsForArtifact(artifact?.id ?? null);

  return (
    <StatusDialog
      isOpen={isOpen}
      title={<Trans>Information</Trans>}
      cancelText={<Trans>Continue</Trans>}
      cancelButtonProps={{
        color: "green",
      }}
      buttonLayout="horizontal"
      bg="info"
      onCancel={onClose}
    >
      {artifact && (
        <div className="relative px-4 pb-6 flex flex-col items-center">
          <ElementCard
            key={artifact.id}
            larger
            image={artifact.gifUrl}
            fallbackImage={artifact.thumbnailUrl}
            blurredImage={artifact.thumbnailUrl}
            name={artifact.name}
            level={artifact.level}
            coverColor={artifact.backgroundColor}
            borderColor={artifact.strokeColor}
          />
          <div className="mt-6">
            <Collapsible
              openText={<Trans>Read about element</Trans>}
              closeText={<Trans>Hide</Trans>}
              defaultOpen={recipes.length === 0}
            >
              <div className="text-t2 text-center w-[310px]">
                {artifact.description || <Trans>No description</Trans>}
              </div>
            </Collapsible>
          </div>
          {recipes.length > 0 && (
            <Paper className="mt-6 p-3 pb-6 w-[310px]">
              <div className="font-display text-h4 font-medium mb-4 text-center">
                <Trans>Recipes</Trans>
              </div>
              <div className="flex flex-col space-y-3">
                {recipes.map(({ first, second }, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-center space-x-3"
                  >
                    <div className="flex flex-col items-center">
                      <img src={first.thumbnailUrl} className="w-[70px]" />
                      <div className="text-h5 mt-1 font-display font-medium">
                        {first.name}
                      </div>
                    </div>
                    <PlusIcon />
                    <div className="flex flex-col items-center">
                      <img src={second.thumbnailUrl} className="w-[70px]" />
                      <div className="text-h5 mt-1 font-display font-medium">
                        {second.name}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Paper>
          )}
        </div>
      )}
    </StatusDialog>
  );
};
