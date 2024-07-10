import { useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Cell, Sender, SenderArguments } from "@ton/core";
import { Address } from "@ton/ton";
import { useTonConnectModal, useTonConnectUI } from "@tonconnect/ui-react";

import GameEvents from "@/shared/analytics/GameEvents";
import { useBurnRegister, useRequestSignature } from "@/shared/api";
import { NFT_COLLECTION_ADDRESS } from "@/shared/config";
import { createTonClient } from "@/shared/ton/client";
import { usePrevValue } from "@/shared/utils/react/userPrevValue";

import { NftItem } from "./contract/NftItem";
import { NftCollection } from "./contract";
import { calculateMintTransactionPrice, getWalletBalance } from "./utils";

type WalletInfo = {
  balance: string;
  address: string;
};

export const useWalletInfo = () => {
  const queryClient = useQueryClient();
  const [tonConnectUI] = useTonConnectUI();

  useEffect(() => {
    if (tonConnectUI) {
      return tonConnectUI.onStatusChange(async () => {
        await queryClient.invalidateQueries({
          queryKey: [`useWallet`],
        });
      });
    }
  }, [tonConnectUI]);

  return useQuery({
    queryKey: [`useWallet`],
    queryFn: async () => {
      await tonConnectUI.connectionRestored;

      if (!tonConnectUI.wallet) {
        return null;
      }

      const address = tonConnectUI.wallet.account.address;
      const balance = await getWalletBalance(address);

      return {
        address: Address.parseRaw(address).toString(),
        balance,
      } as WalletInfo;
    },
  });
};

export function useConnection(): { sender: Sender; connected: boolean } {
  const [TonConnectUI] = useTonConnectUI();

  return {
    sender: {
      send: async (args: SenderArguments) => {
        await TonConnectUI.sendTransaction({
          messages: [
            {
              address: args.to.toString(),
              amount: args.value.toString(),
              payload: args.body?.toBoc().toString("base64"),
            },
          ],
          validUntil: Date.now() + 5 * 60 * 1000, // 5 minutes
        });
      },
    },
    connected: TonConnectUI.connected,
  };
}

// send event to analytics after wallet connected
function useSendConnectWalletEvent() {
  const queryClient = useQueryClient();
  const { state } = useTonConnectModal();
  const prevModalStatus = usePrevValue(state.status);

  useEffect(() => {
    if (
      prevModalStatus === "opened" &&
      state.status === "closed" &&
      state.closeReason === "wallet-selected"
    ) {
      queryClient
        .invalidateQueries({
          queryKey: [`useWallet`],
        })
        .then(() => {
          const walletInfo = queryClient.getQueryData<WalletInfo>([
            `useWallet`,
          ])!;
          GameEvents.successConnectWallet(walletInfo.balance);
        });
    }
  }, [queryClient, prevModalStatus, state]);
}

export function useWalletConnect() {
  const queryClient = useQueryClient();
  const { open } = useTonConnectModal();
  const [tonUI] = useTonConnectUI();

  useSendConnectWalletEvent();

  return {
    connect: () => {
      open();
    },
    disconnect: async () => {
      await tonUI.disconnect();
      await queryClient.invalidateQueries({
        queryKey: [`useWallet`],
      });
      GameEvents.disconnectWallet();
    },
  };
}

export function useMint({
  address,
  artifactId,
  mintPrice,
}: {
  address: string;
  artifactId: string;
  mintPrice: string;
}) {
  const queryClient = useQueryClient();
  const connection = useConnection();

  const { refetch: getSignature } = useRequestSignature(artifactId, address);

  return useMutation({
    mutationFn: async () => {
      // receive signature from backend for specified artifact and address
      const data = await getSignature();

      if (!data.data) {
        throw new Error("cant get signature");
      }

      const client = createTonClient();
      const nftCollection = client.open(
        NftCollection.createFromAddress(Address.parse(NFT_COLLECTION_ADDRESS))
      );

      const bufferFromHex = Buffer.from(data.data.signature, "hex");

      const msg = Cell.fromBoc(bufferFromHex);
      await nftCollection.sendUserMint(
        connection.sender,
        msg[0],
        calculateMintTransactionPrice(mintPrice)
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [`useWallet`, `useUser`],
      });
    },
  });
}

export function useBurnNft({
  nftIndex,
  ownerAddress,
  nftAddress,
}: {
  nftAddress: string;
  ownerAddress: string;
  nftIndex: string;
}) {
  const queryClient = useQueryClient();

  const { refetch: getSignature } = useBurnRegister(nftIndex, ownerAddress);

  const { mutateAsync } = useSendNft();

  return useMutation({
    mutationFn: async () => {
      const data = await getSignature();

      if (!data.data) {
        throw new Error("cant get burn register");
      }

      await mutateAsync({
        toAddress: data.data.burnAddress,
        nftAddress: nftAddress,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [`useWallet`, `useUser`],
      });
    },
  });
}

export function useSendNft() {
  const connection = useConnection();

  return useMutation({
    mutationFn: async ({
      toAddress,
      nftAddress,
    }: {
      toAddress: string;
      nftAddress: string;
    }) => {
      const client = createTonClient();
      const nftCollection = client.open(
        NftItem.createFromAddress(Address.parse(nftAddress))
      );

      await nftCollection.send(connection.sender, Address.parse(toAddress));
    },
  });
}

export function useInvalidateAfterSendNft() {
  const queryClient = useQueryClient();

  return () =>
    queryClient.invalidateQueries({
      queryKey: [`useWallet`, `useUser`],
    });
}
