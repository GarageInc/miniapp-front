import { useEffect } from "react";

import CRAFTED_RESPONSE from "@/shared/api/fixtures/match-success.json";

import { mapCraftResult } from "../../lib/adapters";
import { useInventoryStore } from "../../model/store";
import { UserInventory } from "../UserInventory";

export default () => {
  const { setCrafted } = useInventoryStore();

  const data = CRAFTED_RESPONSE as unknown as API.MatchArtifactsResult;

  useEffect(() => {
    setCrafted(mapCraftResult(data, [data.crafted!, data.crafted!]));
  }, []);
  return <UserInventory />;
};
