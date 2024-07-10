import { withMockServer } from "@/shared/api/fixtures/server";

import { FriendsList } from "../FriendsList";

export default withMockServer({
  routes: {
    get: {
      "/referrals/friends": [],
    },
  },
})(FriendsList);
