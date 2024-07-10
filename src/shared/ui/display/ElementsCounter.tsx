import cx from "classnames";
import { FC, ReactNode } from "react";

import { IconVariant, IllustrationIcon } from "@/shared/ui/icons";

export type ElementsCounterProps = {
  className?: string;
  current: number;
  total?: number;
  prefixText?: string | ReactNode;
  larger?: boolean;
  iconVariant?: IconVariant;
};

export const ElementsCounter: FC<ElementsCounterProps> = ({
  className,
  total,
  current,
  prefixText,
  larger,
  iconVariant = "gem",
}) => {
  const sizeCls = larger
    ? "h-[52px] space-x-2.5 py-2 pl-4"
    : "h-9 space-x-1.5 py-[5px] pl-3";
  const imgSizeCls = larger ? "w-[29px] h-[29px]" : "w-[24px] h-[24px]";
  const textSizeCls = larger ? "text-t0 font-bold" : "font-medium text-t1";

  return (
    <div
      className={cx(
        `${sizeCls} flex items-center pr-4 bg-black/[.45] shadow-border-10 rounded-full`,
        className
      )}
    >
      <IllustrationIcon variant={iconVariant} className={imgSizeCls} />
      <div className={textSizeCls}>
        {prefixText}
        {typeof total === "undefined" ? current : `${current}/${total}`}
      </div>
    </div>
  );
};
