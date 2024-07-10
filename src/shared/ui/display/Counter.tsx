import cx from "classnames";
import { FC } from "react";

export type CounterVariant = "dark" | "green" | "red";

export type CounterProps = {
  variant?: CounterVariant;
  quantity: string | number;
  className?: string;
  size?: "lg" | "md";
};

export const Counter: FC<CounterProps> = ({
  variant,
  quantity,
  className,
  size = "md",
}) => {
  const variantCls = {
    dark: "bg-[#313131]",
    green: "bg-[#00A807]",
    red: "bg-[#BA1C12]",
  }[variant || "dark"];

  const quantityShown =
    typeof quantity === "number" && quantity > 99 ? "99+" : quantity;

  const sizeCls = {
    lg: "w-8 h-8 text-[20px] font-extrabold",
    md: "w-6 h-6 text-xs font-extrabold",
  }[size];

  return (
    <div
      className={cx(
        `flex items-center justify-center ${sizeCls} rounded-full ${variantCls} shadow-border-25 drop-shadow-button-label`,
        className
      )}
    >
      {quantityShown}
    </div>
  );
};
