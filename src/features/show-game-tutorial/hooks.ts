import { useGameTutorialStore } from "./store";

export function useGameTutorial() {
  const { isOpen, close, open } = useGameTutorialStore();

  return {
    isOpen,
    close() {
      close();
    },
    open() {
      open();
    },
  };
}
