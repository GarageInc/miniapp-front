import cx from "classnames";
import { FC, HTMLAttributes, PropsWithChildren } from "react";

type LootboxBarContainerProps = PropsWithChildren<{
  className?: string;
}> &
  HTMLAttributes<HTMLDivElement>;

export const LootboxBarContainer: FC<LootboxBarContainerProps> = ({
  className,
  children,
  ...props
}) => {
  return (
    <div
      {...props}
      className={cx(
        `grid grid-cols-6 gap-2 sm:gap-1 rounded-2xl shadow-border-10 p-2 bg-backdrop-secondary`,
        className
      )}
    >
      {children}
    </div>
  );
};
