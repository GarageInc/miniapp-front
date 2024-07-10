import cx from "classnames";
import { FC, ReactNode } from "react";
import { Trans } from "@lingui/macro";

import { Avatar } from "@/shared/ui/display/Avatar";
import {
  ElementsCounter,
  ElementsCounterProps,
} from "@/shared/ui/display/ElementsCounter";

type StatusBarProps = {
  className?: string;
  user: UserStatusProps;
  inventory: ElementsCounterProps;
  additionalButtons?: ReactNode;
};

export const StatusBar: FC<StatusBarProps> = ({
  className,
  user,
  inventory,
  additionalButtons,
}) => {
  return (
    <div
      className={cx(
        `flex justify-between shadow-border-bottom p-3 bg-white/[.1]`,
        className
      )}
    >
      <UserStatus {...user} />
      <div className="flex items-center space-x-2 px-1 shrink-0">
        {additionalButtons}
      </div>
      <ElementsCounter className="shrink-0" {...inventory} />
    </div>
  );
};

type UserStatusProps = {
  pictureUrl?: string | null;
  name: string;
  level: number;
};

const UserStatus: FC<UserStatusProps> = ({ name, level, pictureUrl }) => {
  return (
    <div className="flex shrink space-x-2 overflow-hidden items-center">
      <Avatar pictureUrl={pictureUrl} className="shrink-0" />
      <div className="flex shrink flex-col space-y-1 overflow-hidden">
        <div className="text-sm font-medium leading-none overflow-hidden text-ellipsis text-nowrap break-all ">
          {name}
        </div>
        <div className="text-2xs text-white/[.6] leading-none font-extrabold">
          <Trans>LVL {level}</Trans>
        </div>
      </div>
    </div>
  );
};
