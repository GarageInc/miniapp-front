import { useEffect } from "react";

import { useUserFriendsPaginated } from "@/shared/api";
import { formatPersonName } from "@/shared/utils/formatPersonName";

import { FriendData, useFriendsStore } from "./store";

export function useFriendList() {
  const { data, isLoading, isSuccess, fetchNextPage, hasNextPage } =
    useUserFriendsPaginated();
  const store$ = useFriendsStore();

  useEffect(() => {
    if (data) {
      store$.setFriends(
        data.pages.flatMap((xs) => xs.data).map(mapFriend) ?? [],
        data.pages.slice(-1)[0].total
      );
    }
  }, [data]);

  return {
    totalCount: store$.totalCount,
    friends: store$.friends,
    canLoadMore: hasNextPage,
    isLoading,
    isLoaded: isSuccess,
    selectedFriend: store$.friends.find(
      (friend) => friend.id === store$.selectedFriendId
    ),
    deselect() {
      store$.selectFriend(null);
    },
    dismissTip() {
      store$.dismissInviteTip();
    },
    loadMore() {
      fetchNextPage();
    },
    isTipShown: store$.isInviteTipShown,
  };
}

function mapFriend(data: API.Friend): FriendData {
  return {
    name: formatPersonName({
      firstName: data.first_name,
      lastName: data.last_name,
      username: data.username,
    }),
    score: data.currentElementsCount,
    maxScore: data.maxInventorySize,
    id: data.telegramId.toString(),
    level: data.level,
    avatarUrl: data.photoUrl,
    inventory: data.inventory,
  };
}
