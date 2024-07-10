import cx from "classnames";
import { FC, HTMLAttributes, PropsWithChildren } from "react";

export type PaperProps = PropsWithChildren<{
  variant?: "transculent" | "solid" | "opaque";
}> &
  HTMLAttributes<HTMLDivElement>;

export const Paper: FC<PaperProps> = ({ variant = "solid", ...props }) => {
  const variantCls = {
    transculent: "bg-white/[.05]  backdrop-blur-[50px]",
    solid: "bg-[#141414]",
    opaque: "bg-white/[.1]",
  }[variant];

  return (
    <div
      {...props}
      className={cx(
        `rounded-[14px] p-4 shadow-border-20 ${variantCls}`,
        props.className
      )}
    />
  );
};
