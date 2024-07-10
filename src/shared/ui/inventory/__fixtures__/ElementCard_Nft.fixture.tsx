import ITEM_DATA from "@/shared/api/fixtures/invenory-item.json";
import { Button } from "@/shared/ui/forms";

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
    <div className="flex space-x-2 items-start">
      <ElementCard
        {...itemProps}
        quantity={1}
        quantityPlacement="outside"
        code="#032456"
        buttons={
          <>
            <Button size="sm" color="green">
              Send
            </Button>
            <Button size="sm" color="purple">
              Use
            </Button>
          </>
        }
      />
      <ElementCard
        {...itemProps}
        quantity={1}
        quantityPlacement="outside"
        code="#032456"
        buttons={
          <>
            <Button size="sm" color="green" className="!h-auto !leading-4">
              Mint to 0.00005 TON
            </Button>
          </>
        }
      />
      <ElementCard
        {...itemProps}
        quantity={1}
        quantityPlacement="outside"
        code="#032456"
        buttons={
          <>
            <Button
              size="sm"
              color="green"
              disabled
              className="!h-auto !leading-4"
            >
              Mint to 0.5&nbsp;TON
            </Button>
          </>
        }
      />
    </div>
    <div className="flex space-x-2 items-start mt-8">
      <ElementCard
        {...itemProps}
        larger
        quantity={10}
        maxQuantity={10}
        code="#032456"
      />
    </div>
  </div>
);
