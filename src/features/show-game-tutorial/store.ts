import { create } from "zustand";

type GameTutorialState = {
  isOpen: boolean;
};

type GameTutorialActions = {
  close: () => void;
  open: () => void;
};

const LS_KEY = "gameTutorialCompleted4";

export const useGameTutorialStore = create<
  GameTutorialState & GameTutorialActions
>((set) => ({
  isOpen: getInitialIsOpen(),
  close: () => {
    set({ isOpen: false });
    setLocalStorage(true);
  },
  open: () => set({ isOpen: true }),
}));

function getInitialIsOpen() {
  const isTutorialCompleted = localStorage.getItem(LS_KEY);
  return isTutorialCompleted == null ? true : !JSON.parse(isTutorialCompleted);
}

function setLocalStorage(value: boolean) {
  localStorage.setItem(LS_KEY, value.toString());
}
