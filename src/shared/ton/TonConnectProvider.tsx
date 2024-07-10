import { FC, ReactNode } from "react";
import { TonConnectUIProvider } from "@tonconnect/ui-react";

import { TON_WALLET_MANIFEST_URL } from "@/shared/config";

export const TonConnectProvider: FC<{
  children: ReactNode;
}> = ({ children }) => {
  return (
    <TonConnectUIProvider manifestUrl={TON_WALLET_MANIFEST_URL}>
      {children}
    </TonConnectUIProvider>
  );
};
