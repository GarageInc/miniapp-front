import cx from "classnames";
import { ButtonHTMLAttributes, forwardRef } from "react";

import { CrossIcon } from "@/shared/ui/icons";

export type CloseButtonProps = {
  size?: "md" | "lg" | "sm";
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const CloseButton = forwardRef<HTMLButtonElement, CloseButtonProps>(
  ({ size = "lg", className, ...props }, ref) => {
    const sizeCls = {
      lg: "w-9 h-9",
      md: "w-6 h-6",
      sm: "w-4 h-4",
    }[size];

    const iconSize = {
      lg: "w-4 h-4",
      md: "w-3 h-3",
      sm: "w-2 h-2",
    }[size];

    const shadowCls = {
      lg: "0px 1.5px 3px 0px #000000",
      md: "0px 1px 2px 0px #000000",
      sm: "0px 1px 2px 0px #000000",
    }[size];

    return (
      <button
        ref={ref}
        className={cx(
          `flex items-center justify-center rounded-full border-[1px] border-white/[.2] text-white bg-[#272527] ${sizeCls}`,
          className
        )}
        {...props}
        style={{
          ...props,
          boxShadow: shadowCls,
        }}
      >
        <CrossIcon className={iconSize} />
      </button>
    );
  }
);
