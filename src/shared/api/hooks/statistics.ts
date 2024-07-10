"use client";

import { useQuery } from "@tanstack/react-query";

import { getJson } from "@/shared/http";

export const useLevelLeaderboard = () => {
  return useQuery({
    queryKey: [`useLevelLeaderboard`],
    queryFn: () => getJson<API.LevelLeaderboardItem[]>(`/statistic/top-levels`),
  });
};

export const useCraftLeaderboard = () => {
  return useQuery({
    queryKey: [`useCraftLeaderboard`],
    queryFn: () =>
      getJson<API.CraftLeaderboardItem[]>(`/statistic/top-crafted-pairs`),
  });
};

export const useReferrersLeaderboard = () => {
  return useQuery({
    queryKey: [`useReferrersLeaderboard`],
    queryFn: () =>
      getJson<API.ReferrerLeaderboardItem[]>(`/statistic/top-referrers`),
  });
};
