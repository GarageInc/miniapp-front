import { FC, ReactNode } from "react";

import { ReactQueryProvider } from "@/shared/api/react-query-provider";
import { I18nWrap } from "@/shared/i18n";
import { TonConnectProvider } from "@/shared/ton";

export const AppProviders: FC<{ children: ReactNode }> = ({ children }) => (
  <I18nWrap>
    <TonConnectProvider>
      <ReactQueryProvider>{children}</ReactQueryProvider>
    </TonConnectProvider>
  </I18nWrap>
);
