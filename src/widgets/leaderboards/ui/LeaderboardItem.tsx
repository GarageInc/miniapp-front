import cx from "classnames";
import { FC } from "react";
import { Trans } from "@lingui/macro";

import { Avatar } from "@/shared/ui/display/Avatar";
import { ElementsCounter } from "@/shared/ui/display/ElementsCounter";
import { Paper } from "@/shared/ui/display/Paper";
import { IconVariant, IllustrationIcon } from "@/shared/ui/icons";

export const LeaderboardItem: FC<LeaderboardItemProps> = ({
  position,
  name,
  scoreValue,
  scoreIcon,
  avatarUrl,
  level,
  isCurrentUser,
  className,
}) => {
  const positionIcon = {
    1: "top1" as IconVariant,
    2: "top2" as IconVariant,
    3: "top3" as IconVariant,
    4: "top4" as IconVariant,
  }[position];

  return (
    <Paper
      variant="transculent"
      className={cx(
        "flex space-x-2.5 items-center",
        isCurrentUser && "sticky bottom-0",
        className
      )}
    >
      <div className={`text-h3 w-[36px] shrink-0 relative text-center`}>
        {positionIcon ? (
          <IllustrationIcon variant={positionIcon} className="w-[32px]" />
        ) : (
          <div>{position}</div>
        )}
        {isCurrentUser && (
          <div className="absolute bottom-[-10px] left-1/2 -translate-x-1/2 text-t4 font-semibold whitespace-nowrap">
            <Trans>My Ranking</Trans>
          </div>
        )}
      </div>
      <Avatar pictureUrl={avatarUrl} />
      <div className="overflow-hidden flex-1">
        <div className="text-h4 font-medium text-ellipsis overflow-hidden text-nowrap">
          {name}
        </div>
        {level && (
          <div className="text-t4 font-bold uppercase text-white/[.6] mt-1">
            <Trans>LVL {level}</Trans>
          </div>
        )}
      </div>
      <ElementsCounter current={scoreValue} iconVariant={scoreIcon} />
    </Paper>
  );
};

export type LeaderboardItemProps = {
  className?: string;
  position: number;
  name: string;
  level?: number;
  avatarUrl?: string | null;
  scoreValue: number;
  scoreIcon?: IconVariant;
  isCurrentUser?: boolean;
};
