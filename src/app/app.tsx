import { BrowserRouter } from "react-router-dom";

import { NetworkOffline } from "@/features/network-offline";

import "./sentry";
import "@/shared/analytics/init-gameanalytics";
import "@/shared/analytics/init-firebase";

import { AppErrorWrapper } from "./app-error-wrapper";
import { AppProviders } from "./providers";
import { AppRouter } from "./router";

function App() {
  return (
    <>
      <AppProviders>
        <NetworkOffline />
        <AppErrorWrapper>
          <BrowserRouter>
            <AppRouter />
          </BrowserRouter>
        </AppErrorWrapper>
      </AppProviders>
    </>
  );
}

export default App;
