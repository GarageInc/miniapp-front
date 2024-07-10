import { create } from "zustand";
import { onlineManager } from "@tanstack/react-query";

type StatusOfflineState = {
  isOffline: boolean;
  isOnline: boolean;
  setIsOnline: (isOnline: boolean) => void;
};

export const useStatusOffline = create<StatusOfflineState>((set) => ({
  isOffline: !onlineManager.isOnline,
  isOnline: !onlineManager.isOnline,
  setIsOnline: (isOnline: boolean) => set({ isOffline: !isOnline, isOnline }),
}));

onlineManager.subscribe((isOnline) => {
  useStatusOffline.setState({ isOffline: !isOnline, isOnline });
});
