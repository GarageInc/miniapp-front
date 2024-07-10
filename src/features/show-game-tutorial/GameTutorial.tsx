import { Trans } from "@lingui/macro";

import { Button } from "@/shared/ui/forms";
import { Modal } from "@/shared/ui/overlays/Modal";

import { useGameTutorial } from "./hooks";

export const GameTutorial = () => {
  const { isOpen, close } = useGameTutorial();

  return (
    <Modal isOpen={isOpen} backdropClassName="bg-black/[.75]">
      <div className="absolute inset-0 flex justify-center overflow-hidden">
        <img src="/images/HowTo.png" alt="" className="h-full object-contain" />
      </div>
      <Button
        className="!absolute bottom-2 left-2 right-2"
        color="green"
        onClick={close}
        data-ga-event="click:tutorial-go"//- event name (can be split by ":")
        data-ga-type="design" //- event type (design, progress, resource)
        data-ga-value="1" //- event value (for design events)
  // data-ga-progression - ga.EGAProgressionStatus (Start | Complete | Fail)
  // data-ga-resource - ga.EGAResourceFlowType (Source | Sink)
      >
        <Trans>Let's GO!</Trans>
      </Button>
    </Modal>
  );
};
