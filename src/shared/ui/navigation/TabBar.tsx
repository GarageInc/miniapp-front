import cx from "classnames";
import { Children, FC, PropsWithChildren, ReactNode } from "react";
import { Link, useMatch } from "react-router-dom";

import { IconVariant, IllustrationIcon } from "@/shared/ui/icons";

type TabBarProps = PropsWithChildren<{
  className?: string;
}>;

export const TabBar: FC<TabBarProps> = ({ className, children }) => {
  const gridTemplateColumns = `repeat(${Children.count(children)}, minmax(0, 1fr))`;

  return (
    <div
      className={cx(`grid shadow-border-top bg-backdrop-secondary`, className)}
      style={{ gridTemplateColumns }}
    >
      {children}
    </div>
  );
};

export type TabBarItemProps = PropsWithChildren<{
  to: string;
  iconVariant: IconVariant;
  indicator?: ReactNode;
}>;

export const TabBarItem: FC<TabBarItemProps> = ({
  to,
  iconVariant,
  children,
  indicator: indicatorElement,
}) => {
  const match = useMatch({ path: to });
  const isActive = !!match;

  return (
    <Link to={"/" + to} className={`p-4 ${isActive ? "bg-tab-active" : ""}`}>
      <div className={`flex flex-col items-center justify-center`}>
        <div className="relative">
          <IllustrationIcon
            variant={iconVariant}
            className="w-10 h-10 sm:w-8 sm:h-8 mix-blend-lighten"
          />
          {indicatorElement && (
            <div className="absolute top-1 right-1 transform translate-x-1/2 -translate-y-1/2">
              {indicatorElement}
            </div>
          )}
        </div>
        <div
          className={`mt-1 text-xs font-display font-bold drop-shadow-button-label ${isActive ? "" : "text-white/[0.2]"}`}
        >
          {children}
        </div>
      </div>
    </Link>
  );
};
