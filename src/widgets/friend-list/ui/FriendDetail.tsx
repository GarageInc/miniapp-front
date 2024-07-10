import { FC, useState } from "react";
import { Trans } from "@lingui/macro";

import { ElementDetailDialog } from "@/features/view-inventory-item-detail";
import { Avatar } from "@/shared/ui/display/Avatar";
import { ElementsCounter } from "@/shared/ui/display/ElementsCounter";
import { ElementCard, InventoryContainer } from "@/shared/ui/inventory";

import { FriendData } from "../model/store";

export const FriendDetail: FC<{ friend: FriendData }> = ({ friend }) => {
  const [selectedItem, setSelectedItem] = useState<API.InventoryItem | null>(
    null
  );

  return (
    <div>
      <div className="flex space-x-2.5 items-start">
        <Avatar size="lg" />
        <div className="overflow-hidden flex-1">
          <div className="text-[20px] leading-[24px] font-bold text-ellipsis overflow-hidden">
            {friend.name}
          </div>
          <div className="text-t2 uppercase text-white/[.6] mt-1">
            <Trans>LVL {friend.level}</Trans>
          </div>
        </div>
        {friend.score && (
          <ElementsCounter
            larger
            current={friend.score}
            total={friend.maxScore}
          />
        )}
      </div>
      <div className="mt-6">
        {friend && (
          <InventoryContainer>
            {friend.inventory.map((item) => (
              <ElementCard
                key={item.artifact.id}
                image={item.artifact.thumbnailUrl}
                name={item.artifact.name}
                level={item.artifact.level}
                quantity={item.count}
                // maxQuantity={item.maxAmount}
                coverColor={item.artifact.backgroundColor}
                borderColor={item.artifact.strokeColor}
                onClick={() => {
                  setSelectedItem(item);
                }}
              />
            ))}
          </InventoryContainer>
        )}
      </div>
      <ElementDetailDialog
        artifact={selectedItem?.artifact ?? null}
        isOpen={!!selectedItem}
        onClose={() => setSelectedItem(null)}
      />
    </div>
  );
};
