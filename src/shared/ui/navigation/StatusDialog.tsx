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

import { Button, ButtonProps } from "@/shared/ui/forms";
import { IconVariant, IllustrationIcon } from "@/shared/ui/icons";
import { Modal, ModalProps } from "@/shared/ui/overlays/Modal";

export type StatusDialogProps = PropsWithChildren<
  ModalProps & {
    title: ReactNode;
    description?: ReactNode;
    secondTitle?: ReactNode;
    icon?: ReactElement | null;
    iconSrc?: string;
    iconVariant?: IconVariant | null;
    onSubmit?: () => void;
    onCancel?: () => void;
    submitText?: string | ReactNode;
    submitButton?: ReactElement<HTMLAttributes<HTMLButtonElement>> | null;
    cancelText?: string | ReactNode;
    smallerTitle?: boolean;
    buttonLayout?: "horizontal" | "vertical";
    bg?: "success" | "fail" | "info" | "blue";
    submitButtonProps?: Partial<ButtonProps>;
    cancelButtonProps?: Partial<ButtonProps>;
    enableSunburstAnimation?: boolean;
    enableFooterAnimation?: boolean;
    enableHeaderAnimation?: boolean;
    // centerContentVertically?: boolean;
  }
>;

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

export const StatusDialog: FC<StatusDialogProps> = ({
  children,
  title,
  description,
  icon: iconElement,
  iconSrc,
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
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentClassName={`flex flex-col items-center h-full overflow-y-auto`}
      backdropContent={
        <>
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
        </>
      }
    >
      <motion.div
        variants={enableHeaderAnimation ? headerVariant : {}}
        initial="hidden"
        animate="visible"
        className={
          enableHeaderAnimation ? "transform-gpu will-change-transform" : ""
        }
      >
        <div className={`pt-[10vh] flex flex-col items-center mb-6`}>
          {iconElement}
          {iconVariant && (
            <IllustrationIcon
              variant={iconVariant}
              className="w-[54px] h-[54px]"
            />
          )}
          {iconSrc && (
            <img src={iconSrc} alt="" className="w-[54px] h-[54px]" />
          )}
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
        className={`sticky bottom-0 w-full p-6 flex ${buttonLayout === "vertical" ? "flex-col space-y-2" : "space-x-2"} ${enableFooterAnimation ? "transform-gpu will-change-transform" : ""}`}
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
    </Modal>
  );
};
