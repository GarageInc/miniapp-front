import { BrowserRouter } from "react-router-dom";

import { AppProviders } from "@/app/providers";
import CRAFTED_RESPONSE from "@/shared/api/fixtures/match-success.json";
import { withMockServer } from "@/shared/api/fixtures/server";
import USER_WITH_INVENTORY from "@/shared/api/fixtures/user_full_inventory.json";

export default withMockServer({
  routes: {
    get: {
      "/users/current": USER_WITH_INVENTORY,
      "/pair/is-failed-craft": { isFailedInPast: true },
    },
    post: {
      "/pair/match": CRAFTED_RESPONSE,
    },
  },
})(({ children }) => {
  return (
    <BrowserRouter>
      <AppProviders>{children}</AppProviders>
    </BrowserRouter>
  );
});
