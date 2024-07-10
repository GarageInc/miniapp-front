import { FC } from "react";
import { Trans } from "@lingui/macro";

import { IllustrationIcon } from "@/shared/ui/icons";

export const EmptyFriends: FC = () => {
  return (
    <div className="pt-12 flex flex-col items-center">
      <IllustrationIcon variant="social" className="w-[54px] h-[54px]" />
      <h2 className="text-h2 font-medium font-display text-center w-[190px]">
        <Trans>Invite friends and collect more rewards!</Trans>
      </h2>
    </div>
  );
};
