import { ReactNode } from "react";
import { Trans } from "@lingui/macro";
import * as Sentry from "@sentry/react";
import { useQueryErrorResetBoundary } from "@tanstack/react-query";

import { StatusDialog } from "@/shared/ui/navigation/StatusDialog";

export const AppErrorWrapper = ({ children }: { children: ReactNode }) => {
  const { reset: resetQueryError } = useQueryErrorResetBoundary();

  return (
    <Sentry.ErrorBoundary
      onReset={resetQueryError}
      fallback={({ resetError }) => (
        <StatusDialog
          title={<Trans>Something went wrong</Trans>}
          isOpen
          iconVariant="error"
          bg="fail"
          smallerTitle
          onSubmit={resetError}
          submitText={<Trans>Try again</Trans>}
        >
          <div />
        </StatusDialog>
      )}
    >
      {children}
    </Sentry.ErrorBoundary>
  );
};
