import FRIENDS_DATA from "@/shared/api/fixtures/friends.json";
import { withMockServer } from "@/shared/api/fixtures/server";

import { FriendsList } from "../FriendsList";

const FRIEND = FRIENDS_DATA[0];

const MANY_FRIENDS = Array.from({ length: 21 }, (_, i) => ({
  ...FRIEND,
  _id: i.toString(),
  first_name: `${FRIEND.first_name} ${i}`,
}));

export default withMockServer({
  routes: {
    get: {
      "/referrals/friends-amount": { amount: 21 },
      "/referrals/friends": (req) => {
        const cursor = req.queryParams.cursor as string;
        const limit = req.queryParams.limit
          ? parseInt(req.queryParams.limit as string, 10)
          : 10;
        // implement mock cursor pagination
        const start = cursor
          ? MANY_FRIENDS.findIndex((f) => f._id === cursor) + 1
          : 0;
        const end = start + limit;
        return MANY_FRIENDS.slice(start, end);
      },
    },
  },
})(() => {
  return (
    <div className="fixed inset-0 h-full">
      <FriendsList />
    </div>
  );
});
