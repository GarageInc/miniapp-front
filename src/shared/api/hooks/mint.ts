"use client";

import { useQuery } from "@tanstack/react-query";

import { postJson } from "@/shared/http";

interface ISignature {
  signature: string;
  nftIndex: string;
}

interface IBurnRegister {
  burnAddress: string;
}

export const useRequestSignature = (
  artifactId: string,
  ownerAddress: string
) => {
  return useQuery({
    queryKey: [`useRequestSignature`],
    queryFn: () =>
      postJson<ISignature>(`/nft/signature`, {
        artifactId,
        ownerAddress,
      }),
    enabled: false,
  });
};

export const useBurnRegister = (nftIndex: string, ownerAddress: string) => {
  return useQuery({
    queryKey: [`useBurnRegister`],
    queryFn: () =>
      postJson<IBurnRegister>(`/nft/register-burn`, {
        nftIndex,
        ownerAddress,
      }),
    enabled: false,
  });
};
