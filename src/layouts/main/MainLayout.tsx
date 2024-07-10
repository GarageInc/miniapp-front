import { FC, ReactNode } from "react";
import { Outlet } from "react-router-dom";

import { SocialRewardsNotification } from "@/features/claim-social-rewards";
import { GameTutorial } from "@/features/show-game-tutorial";
import { useTgWebappScrollHack } from "@/shared/utils/telegram/useTgWebapppScrollHack";
import { UserStatusBar } from "@/widgets/user-status-bar";

export const MainLayout: FC<{ children?: ReactNode }> = ({ children }) => {
  useTgWebappScrollHack();

  return (
    <>
      <GameTutorial />
      <SocialRewardsNotification />
      <div
        className="absolute inset-0 grid"
        style={{
          gridTemplateRows: "auto 1fr",
        }}
      >
        <UserStatusBar className="sticky top-0 transform-gpu" />
        <div className="relative overflow-hidden">
          {children}
          <Outlet />
        </div>
      </div>
    </>
  );
};
