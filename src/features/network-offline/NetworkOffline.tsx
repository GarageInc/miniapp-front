import { StatusDialog } from "@/shared/ui/navigation/StatusDialog";

import iconUrl from "./icon-no-internet.png?base64";
import { useStatusOffline } from "./store";

export const NetworkOffline = () => {
  const { isOffline } = useStatusOffline();

  return (
    isOffline && (
      <StatusDialog
        title="No Internet Connection"
        description="Please check your internet connection and try again."
        isOpen
        iconSrc={`data:image/png;base64,${iconUrl}`}
        bg="fail"
        smallerTitle
        onSubmit={() => window.location.reload()}
        submitText="Try again"
      >
        <div />
      </StatusDialog>
    )
  );
};
