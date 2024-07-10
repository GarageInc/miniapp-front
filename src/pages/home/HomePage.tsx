import { FC, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Trans } from "@lingui/macro";

import { useUpgradeUser, useUser } from "@/shared/api";
import { ROUTES } from "@/shared/routing";
import { Button } from "@/shared/ui/forms";

export const HomePage: FC = () => {
  const { error, isLoading, isSuccess } = useUser();
  const { mutateAsync } = useUpgradeUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && isSuccess) {
      mutateAsync();
      setTimeout(() => {
        navigate("/" + ROUTES.craft);
      }, 2000);
    }
  }, [isLoading, isSuccess, navigate, mutateAsync]);

  if (error) {
    return (
      <div className="mt-10 text-center">We couldn't verify your identity.</div>
    );
  }

  return (
    <div
      className={`absolute inset-0 h-full bg-tonchemy2 bg-cover bg-origin-content bg-center bg-no-repeat`}
    >
      <div className="absolute inset-x-12 bottom-20">
        <Button
          color="purple"
          className={`w-full`}
          data-ga-event="click:play-start" //- event name (can be split by ":")
          data-ga-type="design" //- event type (design, progress, resource)
          data-ga-value="1" //- event value (for design events)
          // data-ga-progression - ga.EGAProgressionStatus (Start | Complete | Fail)
          // data-ga-resource - ga.EGAResourceFlowType (Source | Sink)

          onClick={() => {
            isSuccess && navigate("/" + ROUTES.craft);
          }}
        >
          {isLoading ? "Loading..." : <Trans>Play</Trans>}
        </Button>
      </div>
    </div>
  );
};
