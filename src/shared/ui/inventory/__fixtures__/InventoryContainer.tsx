import USER from "@/shared/api/fixtures/user_full_inventory.json";
import { ElementCard } from "@/shared/ui/inventory/ElementCard";

import { InventoryContainer } from "../InventoryContainer";

export default (
  <InventoryContainer>
    {USER.inventory.map((item) => (
      <ElementCard
        key={item.artifact.id}
        image={item.artifact.thumbnailUrl}
        name={item.artifact.name}
        level={item.artifact.level}
        quantity={item.count}
        maxQuantity={item.maxAmount}
        coverColor={item.artifact.backgroundColor}
        borderColor={item.artifact.strokeColor}
      />
    ))}
  </InventoryContainer>
);
