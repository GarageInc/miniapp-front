import cx from "classnames";
import { motion } from "framer-motion";
import { FC, ReactNode } from "react";
import { default as ReactModal } from "react-modal";

import { CloseButton } from "@/shared/ui/forms";

export type ModalProps = {
  isOpen: boolean;
  onRequestClose?: () => void;
  children: ReactNode;
  className?: string;
  contentClassName?: string;
  backdropContent?: ReactNode;
  noBackdrop?: boolean;
  backdropClassName?: string;
};

export const Modal: FC<ModalProps> = ({
  children,
  onRequestClose,
  className,
  contentClassName,
  backdropContent,
  noBackdrop,
  backdropClassName,
  ...props
}) => {
  return (
    <ReactModal
      {...props}
      className={cx(`absolute inset-0 z-20`, className)}
      overlayClassName={`z-20`}
      ariaHideApp={false}
      parentSelector={() => document.body}
      preventScroll
    >
      <motion.div
        initial={{ opacity: 0.2 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0, ease: "easeOut" }}
      >
        {!noBackdrop && (
          <div
            className={cx(
              `absolute inset-0 bg-black transform-gpu overflow-hidden`,
              backdropClassName
            )}
          >
            {backdropContent}
          </div>
        )}
        {onRequestClose && (
          <div
            className={`absolute right-2 top-2 z-40`}
            onClick={onRequestClose}
          >
            <CloseButton />
          </div>
        )}
        <div className={cx("z-30 absolute inset-0", contentClassName)}>
          {children}
        </div>
      </motion.div>
    </ReactModal>
  );
};
