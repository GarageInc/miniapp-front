import cx from "classnames";
import { motion, Variants } from "framer-motion";
import {
  cloneElement,
  FC,
  HTMLAttributes,
  PropsWithChildren,
  ReactElement,
  ReactNode,
} from "react";

import { Button, ButtonProps, CloseButton } from "@/shared/ui/forms";
import { IconVariant, IllustrationIcon } from "@/shared/ui/icons";

export type StatusScreenProps = PropsWithChildren<{
  isOpen: boolean;
  onRequestClose?: () => void;
  title: ReactNode;
  description?: ReactNode;
  secondTitle?: ReactNode;
  icon?: string;
  iconVariant?: IconVariant;
  onSubmit?: () => void;
  onCancel?: () => void;
  submitText?: string;
  submitButton?: ReactElement<HTMLAttributes<HTMLButtonElement>> | null;
  cancelText?: string;
  smallerTitle?: boolean;
  buttonLayout?: "horizontal" | "vertical";
  bg?: "success" | "fail" | "info" | "blue";
  submitButtonProps?: Partial<ButtonProps>;
  cancelButtonProps?: Partial<ButtonProps>;
  enableSunburstAnimation?: boolean;
  enableFooterAnimation?: boolean;
  enableHeaderAnimation?: boolean;
}>;

const headerVariant: Variants = {
  hidden: {
    opacity: 0,
    y: -20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      delay: 0,
      duration: 0.4,
    },
  },
};

const footerVariant: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      delay: 0,
      duration: 0.4,
    },
  },
};

export const StatusScreen: FC<StatusScreenProps> = ({
  children,
  title,
  description,
  icon,
  iconVariant,
  submitText,
  submitButton,
  smallerTitle,
  onSubmit,
  cancelText,
  onCancel,
  buttonLayout = "vertical",
  bg = "info",
  submitButtonProps,
  cancelButtonProps,
  isOpen,
  onRequestClose,
  enableSunburstAnimation,
  enableHeaderAnimation,
  enableFooterAnimation,
  secondTitle,
}) => {
  const bgCls = {
    success: "bg-radial-green",
    fail: "bg-radial-red",
    info: "bg-radial-purple",
    blue: "bg-radial-blue",
  }[bg];

  return (
    <motion.div
      initial={{ opacity: 0, visibility: "hidden" }}
      animate={{
        opacity: isOpen ? 1 : 0,
        visibility: isOpen ? "visible" : "hidden",
      }}
      transition={{ duration: 0.8, delay: 0, ease: "easeOut" }}
      className={`absolute inset-0 z-20`}
    >
      <div
        className={cx(
          `absolute inset-0 bg-black transform-gpu overflow-hidden`
        )}
      >
        <div
          className={`${bgCls} absolute left-0 w-full inset-0 aspect-square top-[-70px] blur-[50px]`}
        />
        <div
          className="absolute inset-0 aspect-square bg-sunburst bg-fixed bg-cover bg-center bg-no-repeat origin-center"
          style={
            enableSunburstAnimation
              ? {
                  animation: "rotate 20s linear infinite",
                }
              : {}
          }
        />
      </div>
      {onRequestClose && (
        <div className={`absolute right-2 top-2 z-40`} onClick={onRequestClose}>
          <CloseButton />
        </div>
      )}
      <div className="z-30 absolute inset-0 flex flex-col items-center h-full overflow-y-auto">
        <motion.div
          variants={enableHeaderAnimation ? headerVariant : {}}
          initial="hidden"
          animate="visible"
          className={`${enableHeaderAnimation ? "transform-gpu will-change-transform" : ""}`}
        >
          <div className={`pt-[10vh] flex flex-col items-center mb-8`}>
            {iconVariant && (
              <IllustrationIcon
                variant={iconVariant}
                className="w-[54px] h-[54px]"
              />
            )}
            {icon && <img src={icon} alt="" className="w-[54px] h-[54px]" />}
            <div
              className={`font-display font-medium text-center ${smallerTitle ? "text-h3 mt-4" : "text-h1 mt-2"}`}
            >
              {title}
            </div>
            {description && (
              <div className="text-center mt-2 text-t2 max-w-[300px] leading-5">
                {description}
              </div>
            )}
          </div>
          {secondTitle && (
            <div className="font-semibold text-t0 text-center mb-4">
              {secondTitle}
            </div>
          )}
        </motion.div>
        <div className={`flex-1 w-full`}>{children}</div>
        <motion.div
          className={`sticky z-40 bottom-0 w-full p-6 flex ${buttonLayout === "vertical" ? "flex-col space-y-2" : "space-x-2"} ${enableFooterAnimation ? "transform-gpu will-change-transform" : ""}`}
          style={{
            background:
              "linear-gradient(180deg, rgba(18, 18, 18, 0) 0%, rgba(18, 18, 18, 1) 14.6%)",
          }}
          variants={enableFooterAnimation ? footerVariant : {}}
          initial="hidden"
          animate="visible"
        >
          {cancelText && (
            <Button
              color="gray"
              {...cancelButtonProps}
              className={`w-full`}
              onClick={onCancel}
            >
              {cancelText}
            </Button>
          )}
          {submitText && (
            <Button
              color="purple"
              {...submitButtonProps}
              className={`w-full`}
              onClick={onSubmit}
            >
              {submitText}
            </Button>
          )}
          {submitButton &&
            cloneElement(submitButton, {
              className: cx(submitButton.props.className, "w-full"),
            })}
        </motion.div>
      </div>
    </motion.div>
  );
};
