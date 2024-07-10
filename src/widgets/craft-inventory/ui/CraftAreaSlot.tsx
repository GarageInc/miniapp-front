import cx from "classnames";
import { FC } from "react";
import { Trans } from "@lingui/macro";

import { CirclePlusIcon, CrossIcon } from "@/shared/ui/icons";

import { InventoryItem } from "../model/store";

type CraftAreaSlotProps = {
  item?: InventoryItem | null;
  onRemove: () => void;
  lossChance?: number | null;
  className?: string;
};

export const CraftAreaSlot: FC<CraftAreaSlotProps> = ({
  item,
  onRemove,
  lossChance,
  className,
}) => {
  return (
    <div className="">
      {item ? (
        <div onClick={() => onRemove()} className={className}>
          <OccupiedElement
            img={item.artifact.thumbnailUrl}
            chance={lossChance}
          />
        </div>
      ) : (
        <div className="w-20 h-20 sm:w-16 sm:h-16  text-white/[.4] rounded-full bg-white/[.1] border-[1px] border-dashed border-white/[.4] flex flex-col items-center justify-center">
          <CirclePlusIcon className="w-4 h-4 sm:w-3 sm:h-3" />
          <div className="font-medium text-t3 sm:text-t4 leading-tight mt-1 text-center">
            <span>
              <Trans>
                choose
                <br />
                element
              </Trans>
            </span>
          </div>{" "}
        </div>
      )}
    </div>
  );
};

function OccupiedElement({
  img,
  chance,
}: {
  img: string;
  chance?: number | null;
  canRemove?: boolean;
}) {
  return (
    <div className="w-20 h-20 sm:w-16 sm:h-16  relative">
      <CrossButton className="absolute -right-1" />
      <img src={img} className="w-full h-full object-cover" />
      {chance && (
        <ChanceTip
          chance={chance}
          className="absolute -bottom-2 left-1/2 -translate-x-1/2"
        />
      )}
    </div>
  );
}

function CrossButton({ className }: { className?: string }) {
  return (
    <div
      className={cx(
        "h-6 w-6 flex items-center justify-center rounded-full shadow-border-25 bg-[#272527]",
        className
      )}
    >
      <CrossIcon className="w-2.5 h-2.5 text-white" />
    </div>
  );
}

function ChanceTip({
  chance,
  className,
}: {
  chance: number;
  className?: string;
}) {
  return (
    <div
      className={cx(
        "h-6 w-10 flex text-xs font-medium items-center justify-center rounded-full shadow-craft-chance bg-[#534A56]",
        className
      )}
    >
      {chance}%
    </div>
  );
}
