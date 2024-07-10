import { FC } from "react";
import { Trans } from "@lingui/macro";

import GameEvents from "@/shared/analytics/GameEvents";
import { NFT_COLLECTION_URL } from "@/shared/config";
import { Button } from "@/shared/ui/forms";

export const ViewCollectionButton: FC = () => {
  return (
    <a
      href={NFT_COLLECTION_URL}
      target="_blank"
      rel="noreferrer"
      onClick={() => {
        GameEvents.tapButtonGGCollection();
      }}
    >
      <Button color="green" className="w-full">
        <div className="flex flex-col items-center">
          <div className="text-h4">
            <Trans>Our collection</Trans>
          </div>
          <div className="text-t3">getgems</div>
        </div>
      </Button>
    </a>
  );
};
