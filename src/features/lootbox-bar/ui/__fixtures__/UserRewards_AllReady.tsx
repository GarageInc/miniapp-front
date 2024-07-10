import { withMockServer } from "@/shared/api/fixtures/server";
import USER_WITH_INVENTORY from "@/shared/api/fixtures/user_full_inventory.json";

import { LootboxBar } from "../LootboxBar";

let slots = [
  new Date().toString(),
  new Date().toString(),
  new Date().toString(),
  new Date().toString(),
];

export default withMockServer({
  routes: {
    get: {
      "/users/current": {
        ...USER_WITH_INVENTORY,
        claimableSlots: slots,
        amountUsersLeftToNewSlot: 3,
      },
    },
    post: {
      "/users/claim/first-gift-box": () => {
        slots = [
          ...slots.slice(1),
          new Date(+new Date() + 1000 * 60 * 30).toString(),
        ];
        return {
          user: {
            ...USER_WITH_INVENTORY,
            claimableSlots: slots,
            amountUsersLeftToNewSlot: 3,
          },
          gifts: [getRandom(USER_WITH_INVENTORY.inventory).artifact],
        };
      },
    },
  },
})(() => (
  <div className="fixed top-0 left-0 right-0">
    <LootboxBar />
  </div>
));

function getRandom<T>(arr: T[]) {
  return arr[Math.floor(Math.random() * arr.length)];
}
