import { FC, HTMLAttributes, ReactNode, useState } from "react";
import { Trans } from "@lingui/macro";

import { Counter, CounterVariant } from "@/shared/ui/display/Counter";
import { CheckboxIcon, IllustrationIcon } from "@/shared/ui/icons";

type QuantityPlacement = "outside" | "inside";

type ElementCardProps = {
  image: string;
  fallbackImage?: string;
  blurredImage?: string;
  name: string | ReactNode;
  level?: number | null;
  footerText?: string | ReactNode;
  quantity?: number | null;
  quantityPrefix?: string;
  maxQuantity?: number;
  hideQuantity?: boolean;
  disableSelect?: boolean;
  isSelected?: boolean;
  coverColor: string;
  borderColor?: string;
  onSelect?: () => void;
  onRemove?: () => void;
  className?: string;
  larger?: boolean;
  isLost?: boolean;
  opaqueBackground?: boolean;
  quantityPlacement?: QuantityPlacement;
  quantityVariant?: CounterVariant;
  buttons?: ReactNode;
  code?: string;
} & HTMLAttributes<HTMLDivElement>;

export const ElementCard: FC<ElementCardProps> = ({
  disableSelect,
  isSelected,
  onSelect,
  className,
  larger,
  onClick,
  image: img,
  blurredImage,
  fallbackImage,
  name: title,
  quantity,
  quantityPrefix = "",
  maxQuantity,
  hideQuantity,
  level,
  footerText,
  quantityPlacement = "inside",
  quantityVariant,
  opaqueBackground,
  coverColor: bgColor,
  borderColor,
  code,
  buttons: buttonsContent,
  isLost,
  ...props
}) => {
  const sizeCls = larger ? "w-[210px]" : "w-[86px]";
  const roundedCls = larger ? "rounded-[24px]" : "rounded-[8px]";
  const showQuantity =
    !hideQuantity &&
    quantityPlacement === "inside" &&
    typeof quantity === "number";
  const zeroQuantity = quantity === 0;
  const aspectRatio = larger ? 210 / 282 : 86 / 133;
  const [imageUrl, setImageUrl] = useState(img);

  const shadows = {
    error: "0px 0px 0px 1px #BA1C12 inset",
    inner: larger
      ? `-7px -7px 2px rgba(0, 0, 0, 0.35) inset, 7px 7px 2px ${borderColor ?? "rgba(255,255,255,0.35)"} inset`
      : `-5px -5px 2px rgba(0, 0, 0, 0.35) inset, 5px 5px 2px ${borderColor ?? "rgba(255,255,255,0.35)"} inset`,
    default: `inset 0 0 0 ${larger ? 2 : 1}px rgba(255,255,255,0)`,
    selected: "0px 0px 0px 1.5px rgba(57, 222, 103, 0.65) inset",
  };

  const boxShadowStyle =
    (isLost ? shadows.error : isSelected ? shadows.selected : shadows.default) +
    (!isLost ? `, ${shadows.inner}` : "");

  const lostGradientBg =
    "linear-gradient(180deg, rgba(186, 28, 18, 0) 0%, rgba(186, 28, 18, 0.3) 100%), #000000";

  return (
    <>
      <div
        className={`flex flex-col relative ${opaqueBackground ? "bg-black" : ""} p-1 pb-0.5 ${disableSelect ? "pointer-events-none" : ""} ${roundedCls} ${larger ? "p-3 " : ""} ${zeroQuantity && !isSelected ? "grayscale opacity-40" : ""} ${sizeCls} ${className}`}
        {...props}
        style={{
          aspectRatio: aspectRatio,
          background: isLost ? lostGradientBg : bgColor,
          boxShadow: boxShadowStyle,
          ...props.style,
        }}
        onClick={(e) => {
          onClick?.(e);
          if (disableSelect) {
            return;
          }
          if (!e.isDefaultPrevented()) {
            onSelect?.();
          }
        }}
      >
        {quantityPlacement === "outside" && typeof quantity === "number" && (
          <Counter
            quantity={quantityPrefix ? quantityPrefix + quantity : quantity}
            variant={quantityVariant}
            size={larger ? "lg" : "md"}
            className={`absolute ${larger ? "right-[-8px] top-[-8px]" : "right-[-5px] top-[-5px]"}`}
          />
        )}
        <div
          className={`flex-1 flex flex-col justify-between ${larger ? "p-3 " : "p-1"}`}
        >
          <div className="relative">
            <img
              className={`absolute inset-0  ${larger ? "blur-[20px]" : "blur-[15px]"} ${isLost ? "grayscale opacity-40" : ""}`}
              alt="logo"
              src={blurredImage ?? imageUrl}
            />
            <img
              className={`z-1 transform-gpu ${isLost ? "grayscale opacity-40" : ""}`}
              alt="logo"
              src={imageUrl}
              onError={() => {
                if (fallbackImage && imageUrl !== fallbackImage) {
                  setImageUrl(fallbackImage);
                }
              }}
            />
            {isLost && (
              <div className="absolute top-[100%] -translate-y-1/2 left-1/2 -translate-x-1/2 rounded-full bg-[#BA1C12] font-display font-medium shadow-border-25 text-h5 px-3 py-1.5">
                Lost
              </div>
            )}
          </div>
          <div
            className={`mt-1.5 font-display font-medium text-center pb-2 ${larger ? "text-h3" : "text-h5"}`}
          >
            {title}
          </div>
        </div>
        <div
          className={`flex items-center mx-1 py-1.5 text-white/[.7] ${larger ? "text-t3 pt-2 pb-3 font-medium" : "text-t4 font-extrabold"} ${showQuantity ? "justify-between" : "justify-center"} border-t border-white border-opacity-10`}
        >
          {typeof level === "number" && (
            <div>
              <Trans>LVL {level}</Trans>
            </div>
          )}
          {footerText && <div>{footerText}</div>}
          {showQuantity && (
            <div className={`flex items-center`}>
              <IllustrationIcon variant="gem" className="w-3 h-3 mr-0.5" />
              <span>
                {maxQuantity ? formatQuantity(quantity, maxQuantity) : quantity}
              </span>
            </div>
          )}
        </div>
        {code && (
          <div
            className={`shadow-border-25 flex items-center font-medium ${larger ? "h-[30px] text-t1 mb-3" : "h-[18px] text-t3 mb-1.5"}`}
          >
            <div className="w-full text-center">{code}</div>
          </div>
        )}
        {buttonsContent && (
          <div className="flex flex-col justify-stretch space-y-1 pb-0.5">
            {buttonsContent}
          </div>
        )}
        {zeroQuantity && isSelected && (
          <div
            className={`absolute inset-[2px] opacity-50 bg-black ${roundedCls}`}
          ></div>
        )}
        {isSelected && (
          <CheckboxIcon className="absolute right-[-10px] top-[-10px]" />
        )}
      </div>
    </>
  );
};

function formatQuantity(quantity: number, maxQuantity: number) {
  return maxQuantity > 0 ? `${quantity}/${maxQuantity}` : quantity;
}
