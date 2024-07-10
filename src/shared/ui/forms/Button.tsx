import cx from "classnames";
import {
  ButtonHTMLAttributes,
  cloneElement,
  forwardRef,
  ReactElement,
  SVGAttributes,
} from "react";

export type ButtonProps = {
  color?: "purple" | "gray" | "red" | "green" | "yellow";
  active?: boolean;
  size?: "md" | "lg" | "sm";
  icon?: ReactElement<SVGAttributes<SVGElement>>;
  iconLeft?: ReactElement<SVGAttributes<SVGElement>>;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      color = "purple",
      active,
      size = "lg",
      icon: iconElement,
      iconLeft: iconLeftElement,
      children,
      className,
      ...props
    },
    ref
  ) => {
    const hasChildren = !!children;
    const isOnlyIcon = !hasChildren && (!!iconElement || !!iconLeftElement);

    const roundedCls = {
      lg: "rounded-[12px]",
      md: "rounded-[8px]",
      sm: "rounded-[4px]",
    }[size];
    const afterRoundedCls = {
      lg: "after:rounded-[12px]",
      md: "after:rounded-[8px]",
      sm: "after:rounded-[4px]",
    }[size];

    const borderCls = `after:absolute after:inset-0 after:border-[1px] after:border-brd ${afterRoundedCls}`;

    const hasDepth = true;

    const colorCls = color
      ? {
          red: "bg-btn-red text-white",
          green: "bg-btn-green text-white",
          yellow: "bg-btn-yellow text-[#23181C]",
          purple: "bg-btn-purple text-white",
          gray: "bg-btn-gray text-white",
        }[color]
      : "";

    const activeCls = active
      ? "shadow-btn-active after:hidden"
      : `${hasDepth ? "shadow-btn-default" : ""} active:shadow-btn-active activeAfter:hidden`;
    const disabledCls = props.disabled
      ? `bg-none after:hidden pointer-events-none !bg-btn-disabled !shadow-button-disabled !text-white/[.4]`
      : "";

    const sizeCls = {
      lg: `text-[22px] h-[54px] ${roundedCls} ${isOnlyIcon ? "aspect-square" : "px-6"}`,
      md: `text-[16px] h-[36px] ${roundedCls} ${isOnlyIcon ? "aspect-square" : "px-4"}`,
      sm: `text-[12px] h-[30px] ${roundedCls} ${isOnlyIcon ? "aspect-square" : "px-3"}`,
    }[size];

    const iconSize = {
      lg: 32,
      md: 24,
      sm: 16,
    }[size];

    return (
      <button
        ref={ref}
        className={cx(
          `relative flex items-center justify-center ${colorCls} ${activeCls} ${borderCls} ${disabledCls} ${sizeCls} select-none font-display font-bold`,
          className
        )}
        {...props}
      >
        <div
          className={`relative drop-shadow-button-label top-[-1px] flex items-center ${size === "sm" ? "space-x-1" : "space-x-2"}`}
        >
          {iconLeftElement &&
            cloneElement(iconLeftElement, {
              width: iconSize,
              height: iconSize,
            })}
          {hasChildren && <span>{children}</span>}
          {iconElement &&
            cloneElement(iconElement, {
              width: iconSize,
              height: iconSize,
            })}
        </div>
      </button>
    );
  }
);
