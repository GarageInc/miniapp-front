import { AnimatePresence, LayoutGroup, motion, Variants } from "framer-motion";
import { Trans } from "@lingui/macro";

import { FriendInviteButton } from "@/features/friend-invite";
import { ForwardIcon } from "@/shared/ui/icons";
import { ElementCard, InventoryContainer } from "@/shared/ui/inventory";
import { StatusDialog } from "@/shared/ui/navigation/StatusDialog";

import { useSocialRewards } from "../model/hooks";
import { RewardsBatchItem } from "../model/store";

const listVariant: Variants = {
  hidden: {
    opacity: 0,
    transition: {
      delay: 0,
      when: "afterChildren",
      staggerChildren: 0.1,
      duration: 0.2,
      staggerDirection: -1,
    },
  },
  visible: {
    opacity: 1,
    transition: {
      delay: 0,
      duration: 0.2,
      when: "beforeChildren",
      staggerChildren: 0.1,
    },
  },
};

const itemVariant: Variants = {
  hidden: {
    y: -10,
    opacity: 0,
    transition: {
      duration: 0.25,
    },
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.25,
    },
  },
};

export const SocialRewardsNotification = () => {
  const {
    isOpen,
    rewards,
    tryClaimCurrent,
    tryClaimAll,
    claimWithOverflow,
    close,
    isSingleClaim,
    currentBatchIndex,
    currentFriendName,
    totalBatchesClaiming: totalBatches,
    isOverflowInventoryError,
    exceedLimitItems,
    isClaimPending,
  } = useSocialRewards();

  const handleSubmit = () => {
    if (isOverflowInventoryError) {
      claimWithOverflow();
    } else if (isSingleClaim) {
      tryClaimCurrent();
    } else {
      tryClaimAll();
    }
  };

  return !isOpen ? null : (
    <LayoutGroup>
      <StatusDialog
        isOpen={isOpen}
        onRequestClose={close}
        title={
          isOverflowInventoryError ? (
            <Trans>Warning</Trans>
          ) : (
            <Trans>Social Power!</Trans>
          )
        }
        description={
          isOverflowInventoryError ? (
            ""
          ) : (
            <span>
              <Trans>Your friend</Trans>{" "}
              {currentFriendName && (
                <span className="font-semibold">
                  {currentFriendName ?? ""}{" "}
                </span>
              )}
              <Trans>has accepted your invite!</Trans>
            </span>
          )
        }
        secondTitle={
          isOverflowInventoryError ? (
            <Trans>Inventory is full</Trans>
          ) : isSingleClaim ? (
            <Trans>Bonus reward:</Trans>
          ) : (
            <Trans>
              Bonus rewards: {currentBatchIndex + 1}/{totalBatches}
            </Trans>
          )
        }
        iconVariant={isOverflowInventoryError ? "error" : "social"}
        bg={isOverflowInventoryError ? "fail" : "info"}
        submitText={
          isOverflowInventoryError ? (
            isSingleClaim ? (
              <Trans>Get reward</Trans>
            ) : (
              <Trans>Get rewards</Trans>
            )
          ) : isSingleClaim ? (
            <Trans>Collect</Trans>
          ) : (
            <Trans>Collect All</Trans>
          )
        }
        onSubmit={handleSubmit}
        submitButtonProps={{
          disabled: isClaimPending,
        }}
        cancelText={
          isSingleClaim || isOverflowInventoryError ? (
            ""
          ) : (
            <Trans>Next reward</Trans>
          )
        }
        cancelButtonProps={{
          disabled: isClaimPending,
          icon: <ForwardIcon />,
        }}
        onCancel={tryClaimCurrent}
      >
        <div className="flex flex-col items-center mx-4">
          {!isOverflowInventoryError && (
            <>
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentBatchIndex}
                  variants={listVariant}
                  animate="visible"
                  initial="hidden"
                  exit="hidden"
                >
                  <InventoryContainer centered>
                    {rewards.map((item, idx) => (
                      <motion.div
                        key={currentBatchIndex + idx}
                        variants={itemVariant}
                      >
                        {renderReward(item)}
                      </motion.div>
                    ))}
                  </InventoryContainer>
                </motion.div>
              </AnimatePresence>
              <motion.div
                layout
                className="flex flex-col items-center mt-6 mx-10 space-y-4"
              >
                <div className="text-center text-t2">
                  <Trans>
                    Invite more friends and get additional slots with rewards
                    boxes and speed up the cooldown of rewards.
                  </Trans>
                </div>
                <FriendInviteButton
                  color="purple"
                  size="md"
                  _gaScreen="Social Power"
                >
                  <Trans>Invite new friend</Trans>
                </FriendInviteButton>
              </motion.div>
            </>
          )}
          <InventoryContainer centered>
            {exceedLimitItems.map((item) => (
              <ElementCard
                key={item.artifact.id}
                image={item.artifact.thumbnailUrl}
                name={item.artifact.name}
                level={item.artifact.level}
                quantity={item.count}
                coverColor={item.artifact.backgroundColor}
                borderColor={item.artifact.strokeColor}
                quantityPlacement="outside"
                quantityVariant="green"
              />
            ))}
          </InventoryContainer>
          {isOverflowInventoryError && (
            <div className="text-center text-t2 mx-8 mt-6">
              <Trans>
                Maximum number of stock in inventory. Please free up space in
                your inventory by CRAFTING to receive reward.
              </Trans>
            </div>
          )}
        </div>
      </StatusDialog>
    </LayoutGroup>
  );
};

const renderReward = (item: RewardsBatchItem) => {
  if ("artifact" in item) {
    return (
      <ElementCard
        className="w-full"
        image={item.artifact.thumbnailUrl}
        name={item.artifact.name}
        level={item.artifact.level}
        quantity={item.count}
        coverColor={item.artifact.backgroundColor}
        borderColor={item.artifact.strokeColor}
        quantityPlacement="outside"
        quantityVariant="green"
      />
    );
  }
  if ("newSlots" in item) {
    return (
      <ElementCard
        className="w-full"
        image="/images/pressure.webp"
        name={<Trans>New slot</Trans>}
        footerText={<Trans>+{item.newSlots} gift</Trans>}
        borderColor="#4C3F38"
        coverColor="#C8AA96"
      />
    );
  }
  if ("cooldownReductionMinutes" in item) {
    return (
      <ElementCard
        className="w-full"
        image="/images/pressure.webp"
        name={<Trans>Cooldown</Trans>}
        footerText={<Trans>-{item.cooldownReductionMinutes} min</Trans>}
        borderColor="#4C3F38"
        coverColor="#C8AA96"
      />
    );
  }
  if ("failedCraftsTipUnlocked" in item) {
    return (
      <ElementCard
        className="w-full"
        image="/images/ai.jpg"
        name="AI"
        footerText={<Trans>Unlocked</Trans>}
        borderColor="rgb(71, 60, 104)"
        coverColor="rgb(125, 110, 175)"
      />
    );
  }

  return null;
};
