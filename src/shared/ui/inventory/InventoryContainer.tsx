import cx from "classnames";
import {
  Children,
  cloneElement,
  FC,
  PropsWithChildren,
  ReactElement,
} from "react";

type InventoryContainerProps = PropsWithChildren<{
  centered?: boolean;
  className?: string;
}>;

export const InventoryContainer: FC<InventoryContainerProps> = ({
  children,
  centered,
  className,
}) => {
  const childCount = Children.count(children);
  const isAutoWidth = centered && childCount < 4;
  const containerCls = isAutoWidth
    ? `flex justify-center`
    : "grid grid-cols-4 sm:grid-cols-3 lg:grid-cols-4 items-stretch";
  const itemCls =
    centered && childCount < 4 ? "w-[var(--card-responsive-width)]" : "w-full";

  return (
    <div className={cx(`${containerCls} gap-2`, className)}>
      {Children.map(children, (ch) =>
        cloneElement(ch as ReactElement, { className: itemCls })
      )}
    </div>
  );
};
