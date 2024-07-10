import { create } from "zustand";

type NftCollectionItem = {
  id: string;
  artifact: API.Artifact;
  nft: API.NftItem;
};

type WalletState = {
  address: string;
  balance: string;
  nftCollection: NftCollectionItem[];
  mintItems: API.InventoryItem[];
  sendId: string | null;
  mintId: string | null;
  useId: string | null;
  isMintMode: boolean;
};

type WalletActions = {
  setNftCollection: (nftCollection: NftCollectionItem[]) => void;
  setMintItems: (mintItems: API.InventoryItem[]) => void;
  setWalletData: (address: string, balance: string) => void;
  openSendDialog: (id: string) => void;
  closeSendDialog: () => void;
  openMintDialog: (id: string) => void;
  closeMintDialog: () => void;
  openUseDialog: (id: string) => void;
  closeUseDialog: () => void;
  toggleMintMode: () => void;
};

const initialState: WalletState = {
  address: "",
  balance: "",
  nftCollection: [],
  mintItems: [],
  sendId: null,
  mintId: null,
  useId: null,
  isMintMode: false,
};

export const useWalletStore = create<WalletState & WalletActions>((set) => ({
  ...initialState,
  setNftCollection: (nftCollection) => set({ nftCollection }),
  setMintItems: (mintItems) => set({ mintItems }),
  setWalletData: (address, balance) => set({ address, balance }),
  openSendDialog: (sendId) => set({ sendId }),
  closeSendDialog: () => set({ sendId: null }),
  openMintDialog: (mintId) => set({ mintId }),
  closeMintDialog: () => set({ mintId: null }),
  openUseDialog: (useId) => set({ useId }),
  closeUseDialog: () => set({ useId: null }),
  toggleMintMode: () => set((state) => ({ isMintMode: !state.isMintMode })),
}));
