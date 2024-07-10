import { FC, useEffect } from "react";
import { useLongPress } from "use-long-press";
import { Trans } from "@lingui/macro";

import { LootboxBar } from "@/features/lootbox-bar";
import { ElementDetailDialog } from "@/features/view-inventory-item-detail";
import { GameEvents } from "@/shared/analytics/GameEvents";
import { ElementCard, InventoryContainer } from "@/shared/ui/inventory";

import { useInventory } from "../model/hooks";

import { CraftArea } from "./CraftArea";

export const UserInventory: FC = () => {
  const {
    inventory: items,
    selectItem,
    checkSelected,
    detail,
    openDetail,
    closeDetail,
  } = useInventory();

  const bindLongPress = useLongPress((event, ctx) => {
    event.preventDefault();
    openDetail(ctx.context as string);
  });

  useEffect(() => {
    if (detail?.item.artifact.name) {
      GameEvents.clickElementInfo(detail.item.artifact.name);
    }
  }, [detail]);

  return (
    <div className="p-3 h-full overflow-y-auto pb-40">
      <LootboxBar className="mb-3" />
      <InventoryContainer className="select-none">
        {items
          .filter((x) => x.isDiscovered)
          .map((item) => (
            <ElementCard
              key={item.artifact.id}
              image={item.artifact.thumbnailUrl}
              name={item.artifact.name}
              level={item.artifact.level}
              quantity={item.count}
              // maxQuantity={item.maxAmount}
              coverColor={item.artifact.backgroundColor}
              borderColor={item.artifact.strokeColor}
              isSelected={checkSelected(item.artifact.id)}
              onSelect={() => selectItem(item.artifact.id)}
              {...bindLongPress(item.artifact.id)}
            />
          ))}
      </InventoryContainer>
      <InventoryContainer className="mt-14 select-none">
        {items
          .filter((x) => !x.isDiscovered)
          .map((item) => (
            <ElementCard
              key={item.artifact.id}
              image={item.artifact.thumbnailUrl}
              name={item.artifact.name}
              quantity={item.count}
              hideQuantity
              footerText={<Trans>Long tap to info</Trans>}
              // maxQuantity={item.maxAmount}
              coverColor={item.artifact.backgroundColor}
              borderColor={item.artifact.strokeColor}
              isSelected={checkSelected(item.artifact.id)}
              onSelect={() => selectItem(item.artifact.id)}
              {...bindLongPress(item.artifact.id)}
            />
          ))}
      </InventoryContainer>
      <CraftArea className="absolute left-1.5 right-1.5 bottom-1" />
      <ElementDetailDialog
        artifact={detail?.item?.artifact ?? null}
        isOpen={!!detail}
        onClose={() => {
          closeDetail();
          GameEvents.clickCloseElementInfo();
        }}
      />
    </div>
  );
};
