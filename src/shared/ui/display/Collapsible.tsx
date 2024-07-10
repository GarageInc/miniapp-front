import { FC, ReactNode, useState } from "react";

import { BackArrowIcon } from "@/shared/ui/icons";

export const Collapsible: FC<{
  children: ReactNode;
  openText: ReactNode;
  closeText: ReactNode;
  defaultOpen?: boolean;
}> = ({ children, openText, closeText, defaultOpen }) => {
  const [isOpen, setOpen] = useState(defaultOpen ?? false);

  const renderButton = () => {
    return (
      <div
        className="flex items-center justify-between cursor-pointer text-white/[.5]"
        onClick={() => setOpen(!isOpen)}
      >
        <div className="text-t2">{isOpen ? closeText : openText}</div>
        <div>
          {isOpen ? (
            <BackArrowIcon className="rotate-90 w-4 h-4 ml-0.5" />
          ) : (
            <BackArrowIcon className="-rotate-90 w-4 h-4 ml-0.5" />
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="w-full flex flex-col items-center space-y-2">
      {isOpen && <div className="mt-4">{children}</div>}
      {renderButton()}
    </div>
  );
};
