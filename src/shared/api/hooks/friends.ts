"use client";
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import GameEvents from "@/shared/analytics/GameEvents";
import { getJson, postJson } from "@/shared/http";

export const useGenerateRefCode = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      return await postJson<string>(`/referrals/generate`, {});
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [`useUserFriends`],
      });
    },
  });
};

export const useUserRefCodes = () => {
  return useQuery({
    queryKey: [`useUserRefCodes`],
    queryFn: () => getJson<API.RefCode[]>(`/referrals/codes`),
  });
};

export const useUserFriendsPaginated = () => {
  return useInfiniteQuery({
    queryKey: ["useUserFriendsPaginated"],
    queryFn: async ({ pageParam }) => {
      const { amount: total } = await getJson<{ amount: number }>(
        `/referrals/friends-amount`
      );

      const data = await getJson<API.Friend[]>(
        pageParam
          ? `/referrals/friends?cursor=${pageParam}&limit=10`
          : "/referrals/friends?limit=10"
      );

      GameEvents.successInvitedFriends(total);

      return { data, total };
    },
    initialPageParam: "",
    getNextPageParam: (lastPage, pages) =>
      pages.flatMap((xs) => xs.data).length < lastPage.total
        ? lastPage.data.slice(-1)[0]?._id
        : undefined,
  });
};

type ReferralsClaimableBonusesResponse = {
  batchRewards: API.ReferralRewardBatch[];
};

export const useReferralsClaimableBonuses = () => {
  return useQuery({
    queryKey: [`useReferralsClaimableBonuses`],
    queryFn: () =>
      getJson<ReferralsClaimableBonusesResponse>(
        `/referrals/claimable-bonuses`
      ),
  });
};

export const useClaimReferralBonuses = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ batchIds }: { batchIds: string[] }) => {
      return await postJson<{ user: API.User }>(
        `/referrals/claim-batch-bonuses`,
        {
          batchIds,
        }
      );
    },
    onSuccess: ({ user }, { batchIds: claimedIds }) => {
      queryClient.setQueryData([`useUser`], user);
      const { batchRewards } =
        queryClient.getQueryData<ReferralsClaimableBonusesResponse>([
          `useReferralsClaimableBonuses`,
        ])!;
      queryClient.invalidateQueries({
        queryKey: [`useReferralsClaimableBonuses`],
      });

      const claimedBatches = batchRewards.filter((x) =>
        claimedIds.includes(x._id)
      );
      claimedBatches.forEach((x) => {
        if (x.newGiftSlotsAmount > 0) {
          GameEvents.unlockSlot(x.giftSlotsAmount);
        }
      });
    },
  });
};
