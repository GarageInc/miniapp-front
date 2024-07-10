import { useQueryClient } from "@tanstack/react-query";

import GameEvents from "./GameEvents";

export function useEventTapInviteFriends(screen: string) {
  const queryClient = useQueryClient();

  return {
    sendEvent: async () => {
      const friends = await queryClient.ensureQueryData<API.Friend[]>({
        queryKey: ["useUserFriends"],
      });

      GameEvents.tapInviteFriends(friends.length, screen);
    },
  };
}
