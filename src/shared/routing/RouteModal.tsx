import { ReactNode } from "react";

import { useShowAppBackButton } from "@/shared/utils/telegram/useShowAppBackButton";

import { Modal } from "../ui/overlays/Modal";

export function RouteModal({ children }: { children: ReactNode }) {
  useShowAppBackButton();

  return (
    <Modal
      isOpen
      contentClassName={`flex flex-col items-center h-full overflow-y-auto`}
    >
      {children}
    </Modal>
  );
}
