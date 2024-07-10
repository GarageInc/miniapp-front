import { useEffect } from "react";

import { useNftCollection, useUser } from "@/shared/api";
import { useWalletInfo } from "@/shared/ton";

import { useWalletStore } from "./store";

export function useWallet() {
  const { data: user } = useUser();
  const { data: wallet, isSuccess: isLoaded } = useWalletInfo();
  const { data: nftList } = useNftCollection(wallet?.address ?? "");
  const store$ = useWalletStore();

  useEffect(() => {
    store$.setNftCollection(
      (nftList ?? []).map((nft) => ({
        id: nft.address,
        artifact: nft.artifact,
        nft: nft,
      }))
    );
  }, [nftList, user]);

  useEffect(() => {
    store$.setMintItems(user?.inventory ?? []);
  }, [user]);

  useEffect(() => {
    store$.setWalletData(wallet?.address ?? "", wallet?.balance ?? "0.00");
  }, [wallet?.balance, wallet?.address]);

  return {
    wallet: wallet,
    balance: store$.balance,
    address: store$.address,
    isWalletConnected: !!wallet,
    isLoaded,
    isMintMode: store$.isMintMode,
    mintItems: store$.mintItems,
    toggleMintMode() {
      store$.toggleMintMode();
    },
    nftCollection: store$.nftCollection,
    isSendDialogOpened: store$.sendId !== null,
    isMintDialogOpened: store$.mintId !== null,
    isUseDialogOpened: store$.useId !== null,
    sendElement: store$.sendId
      ? store$.nftCollection.find((nft) => nft.id === store$.sendId)
      : null,
    useElement: store$.useId
      ? store$.nftCollection.find((nft) => nft.id === store$.useId)
      : null,
    mintElement: store$.mintId
      ? store$.mintItems.find((item) => item.artifact.id === store$.mintId)
      : null,
    beginSendNft(id: string) {
      store$.openSendDialog(id);
    },
    beginMintNft(id: string) {
      store$.openMintDialog(id);
    },
    beginUseNft(id: string) {
      store$.openUseDialog(id);
    },
    cancelUse() {
      store$.closeUseDialog();
    },
    cancelMint() {
      store$.closeMintDialog();
    },
    cancelSend() {
      store$.closeSendDialog();
    },
    submitSend() {},
    submitUse() {},
  };
}
