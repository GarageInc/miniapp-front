"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";

import { getJson } from "@/shared/http";

export const useNftCollection = (address: string) => {
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: [`useNftCollection`, address],
    queryFn: async () => {
      if (!address) {
        return [];
      }

      const data = await getJson<{ nft_items: API.NftItem[] }>(
        // {collection_address}/{limit}/{offset}
        `/nft/list/${address}/100/0`
      );

      // get query data from key `useUser`
      const userData = await queryClient.ensureQueryData<API.User>({
        queryKey: [`useUser`],
      });

      const nfts = await Promise.all(
        data.nft_items.map(async (item) => {
          try {
            const nftItemContent = await loadJsonFile<{ id?: string }>(
              item.content.uri
            );

            // is its our nft item
            if ("id" in nftItemContent) {
              const found = (userData?.inventory ?? []).find(
                (item) => item.artifact.id === nftItemContent.id
              )?.artifact;
              const artifact =
                found ??
                (await getJson<API.Artifact>(
                  `/artifact/item/${nftItemContent.id}`
                ));
              return {
                ...item,
                artifact,
              };
            }
            return false;
          } catch {
            return false;
          }
        })
      );

      return nfts.filter(Boolean) as Array<
        API.NftItem & { artifact: API.Artifact }
      >;
    },
  });
};

async function loadJsonFile<T>(url: string): Promise<T> {
  return fetch(url).then((resp) => resp.json());
}
