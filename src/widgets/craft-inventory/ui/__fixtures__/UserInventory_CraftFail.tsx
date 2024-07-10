import { useEffect } from "react";

import CRAFTED_RESPONSE from "@/shared/api/fixtures/match-fail.json";

import { mapCraftResult } from "../../lib/adapters";
import { useInventoryStore } from "../../model/store";
import { UserInventory } from "../UserInventory";

export default () => {
  const { setCrafted } = useInventoryStore();

  const data = CRAFTED_RESPONSE as unknown as API.MatchArtifactsResult;

  useEffect(() => {
    setCrafted(mapCraftResult(data, [data.lost!, data.lost!]));
  }, []);

  return <UserInventory />;
};
