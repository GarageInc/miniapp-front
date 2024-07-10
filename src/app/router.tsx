import { FC } from "react";
import { Route, Routes } from "react-router-dom";
import * as Sentry from "@sentry/react";

import { MainLayout } from "@/layouts/main";
import { CraftPage } from "@/pages/craft";
import { FriendsListPage } from "@/pages/friends";
import { HomePage } from "@/pages/home";
import { LeaderboardsPage } from "@/pages/leaderboards";
import { WalletPage } from "@/pages/wallet";
import { RouteModal, ROUTES } from "@/shared/routing";

const SentryRoutes = Sentry.withSentryReactRouterV6Routing(Routes);

export const AppRouter: FC = () => {
  return (
    <SentryRoutes>
      <Route path={ROUTES.root} element={<HomePage />} />
      <Route path="/*" element={<MainLayout />}>
        <Route path={ROUTES.craft} element={<CraftPage />} />
        <Route path={ROUTES.friends} element={<FriendsListPage />} />
        <Route
          path={ROUTES.wallet}
          element={
            <RouteModal>
              <WalletPage />
            </RouteModal>
          }
        />
        <Route
          path={ROUTES.leaderboards}
          element={
            <RouteModal>
              <LeaderboardsPage />
            </RouteModal>
          }
        />
      </Route>
    </SentryRoutes>
  );
};
