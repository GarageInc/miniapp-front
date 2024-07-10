import cx from "classnames";
import { AnimationDefinition, motion } from "framer-motion";
import { FC, useEffect, useState } from "react";
import { Trans } from "@lingui/macro";

import { GameEvents } from "@/shared/analytics/GameEvents";
import {
  SequenceSalute,
  SequenceSalutePrefetchHelmet,
} from "@/shared/ui/animations/SequenceSalute";
import { Button } from "@/shared/ui/forms";
import { ArrowRightIcon, IllustrationIcon } from "@/shared/ui/icons";
import { ElementCard, InventoryContainer } from "@/shared/ui/inventory";
import { StatusDialog } from "@/shared/ui/navigation/StatusDialog";
import { Tooltip } from "@/shared/ui/overlays/Tooltip";

import { useInventory } from "../model/hooks";

import { CraftAreaSlot } from "./CraftAreaSlot";

const shakeAnimation: AnimationDefinition = {
  x: [0, 0, 2, 0, -2, 0],
  y: [2, 0, 0, -2, 0, 2],
  transition: {
    duration: 0.3,
    ease: "easeInOut",
    repeat: Infinity,
  },
};

const cardLostAnimation: AnimationDefinition = {
  opacity: [0, 1],
  transition: {
    delay: 0.2,
    duration: 0.6,
    ease: "easeInOut",
  },
};

const cardAnimation: AnimationDefinition = {
  opacity: [0, 1],
  scale: [0.1, 1],
  transition: {
    delay: 0.15,
    duration: 0.6,
    ease: "circInOut",
  },
};

export const CraftArea: FC<{ className?: string }> = ({ className }) => {
  const {
    firstItem,
    secondItem,
    deselectLeft,
    deselectRight,
    canCraft,
    beginCrafting,
    isCrafting,
    craftResult: result,
    dismissCraftResult,
    selectionHasNoRecipe,
  } = useInventory();
  const [isOpened, setIsOpened] = useState(false);
  const [isLvlUpShown, setIsLvlUpShown] = useState(false);

  useEffect(() => {
    if (result) {
      setIsOpened(true);
    }
  }, [result]);

  const isCraftButtonDisabled = !!result || !canCraft || isCrafting;

  function close() {
    if (isLvlUpShown) {
      dismissCraftResult();
      setIsLvlUpShown(false);
      setIsOpened(false);
    } else {
      if (result?.isLevelUp) {
        setIsLvlUpShown(true);
      } else {
        dismissCraftResult();
        setIsOpened(false);
      }
      if (result?.isLost) {
        GameEvents.clickFailCraftContinue();
      } else {
        GameEvents.clickSuccessCraftContinue();
      }
    }
  }

  const icon = isLvlUpShown ? (
    <IllustrationIcon
      variant="level_up"
      className="w-[160px] h-[120px] object-cover"
      larger
    />
  ) : null;

  const title = result?.isLost ? (
    <Trans>Oops...</Trans>
  ) : isLvlUpShown ? (
    <Trans>Level Up!</Trans>
  ) : (
    <Trans>Success Craft!</Trans>
  );
  const description = result?.isLost ? (
    <Trans>No such recipe. Try another one!</Trans>
  ) : isLvlUpShown ? (
    <Trans>Congratulations, you have reached a new level!</Trans>
  ) : (
    ""
  );
  const bg = result?.isLost ? "fail" : "success";
  const secondTitle =
    result?.isNew && !isLvlUpShown ? <Trans>New Element Unlocked:</Trans> : "";
  const continueText = result?.isLost ? (
    <Trans>Let's try!</Trans>
  ) : isLvlUpShown ? (
    <Trans>Yahoooo!!!!!</Trans>
  ) : (
    <Trans>Good Work!</Trans>
  );

  const handleCraftClick = () => {
    beginCrafting();
    GameEvents.tapButtonCraftElements();
  };

  return (
    <>
      <SequenceSalutePrefetchHelmet />
      <div
        className={cx(
          "rounded-full shadow-border-25 backdrop-blur-[60px] z-10 px-3 py-2",
          className
        )}
        style={{ background: "rgba(46, 46, 46, 0.3)" }}
      >
        <div className="flex items-center justify-between">
          <motion.div
            className={`will-change-transform transform-gpu`}
            initial={{ x: 0, y: 0 }}
            animate={{
              x: isOpened ? 130 : 0,
              y: isOpened ? -300 : 0,
            }}
            transition={{ duration: isOpened ? 0.7 : 0, ease: "circInOut" }}
          >
            <motion.div animate={isCrafting ? shakeAnimation : {}}>
              <CraftAreaSlot item={firstItem} onRemove={deselectLeft} />
            </motion.div>
          </motion.div>
          <ArrowRightIcon className="shrink-0" />
          <div>
            <div className="relative">
              <Tooltip
                isOpen={selectionHasNoRecipe}
                content={<TriedCombinationContent />}
                maxWidth={230}
              >
                <Button
                  color="yellow"
                  disabled={isCraftButtonDisabled}
                  onClick={handleCraftClick}
                  className="w-[120px] uppercase"
                >
                  <Trans>Merge</Trans>
                </Button>
              </Tooltip>
            </div>
          </div>
          <ArrowRightIcon className="rotate-180 shrink-0" />
          <motion.div
            className={`will-change-transform transform-gpu`}
            initial={{ x: 0, y: 0 }}
            animate={{
              x: isOpened ? -130 : 0,
              y: isOpened ? -300 : 0,
            }}
            transition={{ duration: isOpened ? 0.7 : 0, ease: "circInOut" }}
          >
            <motion.div animate={isCrafting ? shakeAnimation : {}}>
              <CraftAreaSlot item={secondItem} onRemove={deselectRight} />
            </motion.div>
          </motion.div>
        </div>
      </div>
      <StatusDialog
        isOpen={isOpened}
        title={title}
        description={description}
        icon={icon}
        secondTitle={secondTitle}
        cancelText={continueText}
        cancelButtonProps={{
          color: "green",
        }}
        bg={bg}
        onCancel={close}
        enableFooterAnimation
        enableHeaderAnimation
        enableSunburstAnimation
      >
        <div className="flex flex-col items-center w-full">
          {!isLvlUpShown && result && (
            <>
              {result.isLost && (
                <motion.div animate={cardLostAnimation}>
                  <div className="flex space-x-2">
                    <ElementCard
                      className="mt-3 !w-[120px]"
                      image={result.sourceSurvived!.thumbnailUrl}
                      name={result.sourceSurvived!.name}
                      level={result.sourceSurvived!.level}
                      coverColor={result.sourceSurvived!.backgroundColor}
                      borderColor={result.sourceSurvived!.strokeColor}
                    />
                    <ElementCard
                      className="mt-3 !w-[120px]"
                      isLost
                      image={result.artifact.thumbnailUrl}
                      name={result.artifact.name}
                      level={result.artifact.level}
                      coverColor={result.artifact.backgroundColor}
                      borderColor={result.artifact.strokeColor}
                    />
                  </div>
                </motion.div>
              )}
              {result.isObtained && (
                <>
                  <div className="relative">
                    <motion.div
                      animate={cardAnimation}
                      className="will-change-transform transform-gpu"
                    >
                      <SequenceSalute
                        isPlay={isOpened}
                        delay={250}
                        className="z-[-1] absolute left-1/2 w-screen max-w-[var(--max-container-width)] top-1/2 -translate-x-1/2 -translate-y-1/2 aspect-square"
                      />
                      <ElementCard
                        larger
                        image={result.artifact.gifUrl}
                        fallbackImage={result.artifact.thumbnailUrl}
                        blurredImage={result.artifact.thumbnailUrl}
                        name={result.artifact.name}
                        level={result.artifact.level}
                        coverColor={result.artifact.backgroundColor}
                        borderColor={result.artifact.strokeColor}
                        className="z-10"
                      />
                    </motion.div>
                  </div>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity: isOpened ? 1 : 0,
                    }}
                    transition={{
                      delay: 0.65,
                      duration: 0.4,
                      ease: "easeOut",
                    }}
                    className="text-center mt-4 text-t2 mx-6 leading-4 max-w-[33ch]"
                  >
                    {result.artifact.description}
                  </motion.div>
                </>
              )}
            </>
          )}
          {isLvlUpShown && result && (
            <>
              <div className="font-semibold text-t0 text-center mt-4">
                Bonus reward:
              </div>
              <div className="mt-4">
                <InventoryContainer centered>
                  {result.levelUpRewards.map((artifact) => (
                    <ElementCard
                      key={artifact.id}
                      image={artifact.thumbnailUrl}
                      name={artifact.name}
                      level={artifact.level}
                      coverColor={artifact.backgroundColor}
                      borderColor={artifact.strokeColor}
                    />
                  ))}
                </InventoryContainer>
              </div>
            </>
          )}
        </div>
      </StatusDialog>
    </>
  );
};

const TriedCombinationContent = () => {
  return (
    <div className="flex items-center space-x-2 py-1">
      <img src="/images/ai.jpg" className="w-10" />
      <div className="text-t3">
        <Trans>
          You tried this combination.
          <br />
          No such recipe
        </Trans>
      </div>
    </div>
  );
};
