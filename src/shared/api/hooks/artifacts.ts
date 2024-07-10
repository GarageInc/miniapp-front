"use client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import GameEvents from "@/shared/analytics/GameEvents";
import { getJson, postJson } from "@/shared/http";

export const useRequestNewArtifacts = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => postJson(`/users/request-new-artifacts`, {}),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [`useUser`],
      });
    },
  });
};

export const useClaimFirstGiftBox = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () =>
      postJson<{ gifts: API.Artifact[]; user: API.User }>(
        `/users/claim/first-gift-box`,
        {}
      ),
    onSuccess: ({ user, gifts }) => {
      queryClient.setQueryData(["useUser"], user);
      const recentSlotTime = new Date(user.claimableSlots.slice(-1)[0]);
      const minutesLeft =
        (recentSlotTime.getTime() - new Date().getTime()) / 60000;

      GameEvents.collectSlotReward(
        1,
        gifts.map((x) => x.name),
        minutesLeft.toString()
      );
    },
  });
};

export const useMatchArtifacts = () => {
  return useMutation({
    mutationFn: async ({
      firstId,
      secondId,
    }: {
      firstId: string;
      secondId: string;
    }) => {
      const result = await postJson<API.MatchArtifactsResult>(`/pair/match`, {
        firstId,
        secondId,
      });

      if (result.error) {
        throw new Error(result.error);
      }

      return result;
    },
    onSuccess: (
      { user, isLevelUp, lost, crafted, gifts },
      { firstId, secondId }
    ) => {
      const firstName =
        user.inventory.find((item) => item.artifact.id === firstId)?.artifact
          .name ?? "";
      const secondName =
        user.inventory.find((item) => item.artifact.id === secondId)?.artifact
          .name ?? "";

      // we update user query data later after animations in UI component
      if (crafted) {
        GameEvents.successCraft(crafted.name, [firstName, secondName]);
      }
      if (lost) {
        GameEvents.unsuccessCraft(lost.name, [firstName, firstName]);
      }
      if (isLevelUp) {
        const giftWithUserLevel = (gifts ?? []).find(
          (x) => x.level === user.level
        );
        GameEvents.levelUp(
          user.level,
          (gifts ?? []).map((x) => x.id),
          giftWithUserLevel?.id ?? "",
          [firstId, secondId]
        );
      }
    },
    throwOnError: true,
  });
};

type EstimateLossResult = Record<
  string,
  {
    estimatedLoss: number;
  }
>;

export const useEstimateLoss = ([firstId, secondId]: [
  string | null,
  string | null,
]) => {
  return useQuery<EstimateLossResult | null>({
    queryKey: [`useEstimateLoss`, { firstId, secondId }],
    queryFn: () => {
      if (!firstId || !secondId) {
        return null;
      }

      return postJson<EstimateLossResult>(`/pair/estimate-loss`, {
        firstId,
        secondId,
      });
    },
    refetchInterval: false,
  });
};

type CheckFailedCraftResult = {
  isFailedInPast: boolean;
};

export const useCheckFailedOnceCraft = ({
  firstId,
  secondId,
  disable,
}: {
  firstId: string | null;
  secondId: string | null;
  disable: boolean;
}) => {
  return useQuery({
    queryKey: [`useCheckFailedOnceCraft`, { firstId, secondId }],
    queryFn: () => {
      if (!firstId || !secondId) {
        return { isFailedInPast: false };
      }

      return getJson<CheckFailedCraftResult>(
        `/pair/is-failed-craft?first=${firstId}&second=${secondId}`
      );
    },
    enabled: !disable,
    staleTime: 0,
    refetchInterval: false,
  });
};

export const useListPairsForArtifact = (artifactId: string | null) => {
  return useQuery({
    queryKey: [`useListPairsForArtifact`, { artifactId }],
    queryFn: () => {
      if (!artifactId) {
        return [];
      }
      return getJson<API.CraftRecord[]>(`/pair/crafts/${artifactId}`);
    },
  });
};

export const useListAllArtifacts = () => {
  return useQuery<API.Artifact[]>({
    queryKey: [`useListAllArtifacts`],
    queryFn: () => {
      return getJson<Record<string, API.Artifact>>(`/artifact/all`).then(
        Object.values
      );
    },
    refetchInterval: false,
  });
};
