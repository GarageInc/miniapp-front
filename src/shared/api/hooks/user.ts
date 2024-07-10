"use client";

import { useMutation, useQuery } from "@tanstack/react-query";

import { getJson, postJson } from "@/shared/http";

export const useUser = () => {
  return useQuery({
    queryKey: [`useUser`],
    queryFn: () => getJson<API.User>(`/users/current`),
  });
};

export const useChangeLanguage = () => {
  return useMutation({
    mutationFn: (language: string) =>
      postJson(`/users/change-language`, { language }),
  });
};

export const useUpgradeUser = () => {
  return useMutation({
    mutationFn: () => postJson(`/upgrade/user`),
  });
};

export const useUserCrafts = () => {
  return useQuery<API.CraftRecord[]>({
    queryKey: [`useCrafts`],
    queryFn: () => getJson<API.CraftRecord[]>("/users/crafts"),
    refetchInterval: false,
  });
};
