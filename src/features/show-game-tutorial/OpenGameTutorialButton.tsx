import { useGameTutorial } from "./hooks";
export function OpenGameTutorialButton() {
  const { open } = useGameTutorial();
  return (
    <div
      className="w-4 h-4 rounded-full bg-white/[.2] text-white flex items-center justify-center font-medium text-t2"
      onClick={open}
    >
      ?
    </div>
  );
}
