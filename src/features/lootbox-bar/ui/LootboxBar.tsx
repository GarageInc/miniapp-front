import cx from "classnames";
import { debounce } from "lodash";
import { FC, useMemo } from "react";

import { GameEvents } from "@/shared/analytics/GameEvents";
import { ElementCard, InventoryContainer } from "@/shared/ui/inventory";
import { StatusDialog } from "@/shared/ui/navigation/StatusDialog";

import { useRewards } from "../model/hooks";

import { LootboxBarContainer } from "./LootboxBarContainer";
import { LootboxBarItem } from "./LootboxBarItem";

export type UserRewardsProps = {
  className?: string;
};

export const LootboxBar: FC<UserRewardsProps> = ({ className }) => {
  const {
    slots,
    isClaimable,
    beginClaimBox,
    finishClaimBox,
    gifts,
    remainingFriendsToUnlockNewSlot,
  } = useRewards();

  // debounce clicks to prevent multiple claims
  const handleClaimClick = useMemo(() => {
    return debounce(
      () => {
        isClaimable && beginClaimBox();
      },
      700,
      { leading: true, trailing: false }
    );
  }, [isClaimable]);

  return (
    <div className={cx("relative z-[1]", className)}>
      <LootboxBarContainer>
        {slots.map((slot, idx) => (
          <LootboxBarItem
            key={idx}
            isReady={slot.isReady}
            disableTimeRounding={idx === 0 || Boolean(slots[idx - 1]?.isReady)}
            claimableAt={slot.claimableAt}
            isLocked={slot.isLocked}
            onClick={slot.isReady ? handleClaimClick : () => {}}
            remainingFriendsToUnlock={remainingFriendsToUnlockNewSlot}
          />
        ))}
      </LootboxBarContainer>
      {gifts.length > 0 && (
        <StatusDialog
          isOpen
          title="Rewards"
          submitText="Get it!"
          onSubmit={() => {
            GameEvents.clickLootboxGetItButton();
            finishClaimBox();
          }}
          submitButtonProps={{
            color: "green",
          }}
        >
          {gifts.length === 1 ? (
            <div className="w-full flex justify-center">
              <ElementCard
                key={gifts[0].seq}
                larger
                image={gifts[0].thumbnailUrl}
                name={gifts[0].name}
                level={gifts[0].level}
                coverColor={gifts[0].backgroundColor}
                borderColor={gifts[0].strokeColor}
                opaqueBackground
                quantityPrefix="+"
                quantity={1}
                quantityPlacement="outside"
              />
            </div>
          ) : (
            <InventoryContainer centered>
              {gifts.map((gift) => (
                <ElementCard
                  key={gift.seq}
                  className="w-[80px]"
                  image={gift.thumbnailUrl}
                  name={gift.name}
                  level={gift.level}
                  coverColor={gift.backgroundColor}
                  borderColor={gift.strokeColor}
                  opaqueBackground
                  quantityPrefix="+"
                  quantity={1}
                  quantityPlacement="outside"
                />
              ))}
            </InventoryContainer>
          )}
        </StatusDialog>
      )}
    </div>
  );
};
