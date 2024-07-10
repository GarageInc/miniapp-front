import ITEM_DATA from "@/shared/api/fixtures/invenory-item.json";

import { ElementCard } from "../ElementCard";

const itemProps = {
  image: ITEM_DATA.artifact.logoUrl,
  name: ITEM_DATA.artifact.name,
  level: ITEM_DATA.artifact.level,
  maxQuantity: ITEM_DATA.maxAmount,
  coverColor: "#0FAFAA",
};

export default (
  <div className="py-4 px-2">
    <div className="font-bold text-xl pb-2 smaller">Default size</div>
    <div className="flex space-x-2">
      <ElementCard {...itemProps} quantity={1} quantityPlacement="outside" />
      <ElementCard
        {...itemProps}
        quantity={69}
        quantityPlacement="outside"
        quantityVariant="green"
      />
      <ElementCard {...itemProps} quantity={1111} quantityPlacement="outside" />
    </div>
    <div className="font-bold text-xl mt-6 pb-2">Larger</div>
    <ElementCard
      {...itemProps}
      larger
      quantity={1}
      quantityPlacement="outside"
    />
  </div>
);
