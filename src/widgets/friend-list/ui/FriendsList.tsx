import { FC } from "react";
import AutoSizer from "react-virtualized-auto-sizer";
import { FixedSizeList as List } from "react-window";
import InfiniteLoader from "react-window-infinite-loader";
import { Trans } from "@lingui/macro";

import { GetSocialRewardsButton } from "@/features/claim-social-rewards";
import { CloseButton } from "@/shared/ui/forms";
import { BackArrowIcon } from "@/shared/ui/icons";

import { useFriendList } from "../model/hooks";

import { EmptyFriends } from "./EmptyFriends";
import { FriendCard } from "./FriendCard";
import { FriendDetail } from "./FriendDetail";
import { FriendInviteAlert } from "./FriendInviteAlert";

export const FriendsList: FC = () => {
  const {
    totalCount,
    friends,
    selectedFriend,
    deselect,
    isLoaded,
    dismissTip,
    isTipShown,
    loadMore,
    canLoadMore,
  } = useFriendList();
  const isEmpty = totalCount === 0;
  const isItemLoaded = (index: number) =>
    !canLoadMore || index < friends.length;
  const itemCount = canLoadMore ? friends.length + 1 : friends.length;

  return (
    <div className={`p-3 h-full w-full flex flex-col`}>
      <GetSocialRewardsButton className="w-full mb-4" />
      {isLoaded && (
        <div className="flex-1">
          <InfiniteLoader
            isItemLoaded={isItemLoaded}
            itemCount={itemCount}
            loadMoreItems={loadMore}
          >
            {({ onItemsRendered, ref }) => (
              <AutoSizer>
                {({ height, width }) => (
                  <List
                    height={height}
                    width={width}
                    itemCount={itemCount}
                    itemSize={80}
                    onItemsRendered={onItemsRendered}
                    ref={ref}
                  >
                    {({ index, style }) => {
                      let content;
                      if (!isItemLoaded(index)) {
                        content = <Trans>Loading...</Trans>;
                      } else {
                        content = (
                          <FriendCard
                            key={friends[index].id}
                            friend={friends[index]}
                          />
                        );
                      }
                      return <div style={style}>{content}</div>;
                    }}
                  </List>
                )}
              </AutoSizer>
            )}
          </InfiniteLoader>
          {isEmpty && <EmptyFriends />}
          {isTipShown && (
            <div className="absolute bottom-3 left-3 right-3">
              <div className="relative">
                <div
                  className="absolute right-0 top-0 translate-x-1/3 -translate-y-1/3"
                  onClick={dismissTip}
                >
                  <CloseButton size="md" />
                </div>
                <FriendInviteAlert />
              </div>
            </div>
          )}
        </div>
      )}
      {selectedFriend && (
        <div
          className={`absolute overflow-y-auto inset-0 bg-black z-1 pt-6 px-3 pb-10`}
        >
          <div className="flex items-center py-4" onClick={deselect}>
            <BackArrowIcon className="w-5" />
            <span className="text-t2 font-medium">
              <Trans>Back</Trans>
            </span>
          </div>
          <FriendDetail friend={selectedFriend} />
        </div>
      )}
    </div>
  );
};
