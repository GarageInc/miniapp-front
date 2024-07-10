import { create } from "zustand";

export type FriendData = {
  id: string;
  name: string;
  level: number;
  avatarUrl?: string | null;
  score: number;
  maxScore: number;
  inventory: API.InventoryItem[];
};

type FriendsState = {
  totalCount: number;
  friends: FriendData[];
  selectedFriendId: string | null;
  isInviteTipShown: boolean;
};

type FriendsActions = {
  reset: () => void;
  dismissInviteTip: () => void;
  setFriends: (friends: FriendData[], total: number) => void;
  selectFriend: (id: string | null) => void;
};

const initialState: FriendsState = {
  totalCount: 0,
  friends: [],
  selectedFriendId: null,
  isInviteTipShown: true,
};

export const useFriendsStore = create<FriendsState & FriendsActions>((set) => ({
  ...initialState,
  reset: () => set(initialState),
  setFriends: (friends: FriendData[], total: number) =>
    set({ friends, totalCount: total }),
  dismissInviteTip: () => set({ isInviteTipShown: false }),
  selectFriend: (id: string | null) => set({ selectedFriendId: id }),
}));
