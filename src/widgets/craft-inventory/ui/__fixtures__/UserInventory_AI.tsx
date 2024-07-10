import { useEffect } from "react";

import { useInventoryStore } from "../../model/store";
import { UserInventory } from "../UserInventory";

export default () => {
  const { select } = useInventoryStore();

  useEffect(() => {
    setTimeout(() => {
      select("1");
      select("2");
    }, 1000);
  }, []);

  return <UserInventory />;
};
