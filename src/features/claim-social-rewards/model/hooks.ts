import { useEffect } from "react";

import GameEvents from "@/shared/analytics/GameEvents";
import {
  useClaimReferralBonuses,
  useReferralsClaimableBonuses,
  useUser,
} from "@/shared/api";
import { formatPersonName } from "@/shared/utils/formatPersonName";

import {
  getExceedItems,
  RewardsBatch,
  RewardsBatchItem,
  useSocialRewardsStoreSelector,
} from "./store";

export function useSocialRewards() {
  const { data: userData } = useUser();
  const { data: rewardsData } = useReferralsClaimableBonuses();
  const { mutateAsync: claimBatches, isPending: isClaimPending } =
    useClaimReferralBonuses();
  const store$ = useSocialRewardsStoreSelector();

  useEffect(() => {
    if (!userData) {
      return;
    }
    store$.setUserInventory(userData.inventory);
  }, [userData]);

  useEffect(() => {
    if (!rewardsData) {
      return;
    }
    const batches = rewardsData.batchRewards
      .filter((x) => !x.isClaimed)
      .map(mapBatch);
    store$.setRewards(batches);

    // do not auto-open dialog if user has already seen it and closed
    if (
      !store$.hasShownOnce &&
      !store$.dialogState.isOpen &&
      batches.length > 0
    ) {
      store$.openDialog();
    }
  }, [rewardsData]);

  const requestClaim = async (ids: string[]) => {
    await claimBatches({
      batchIds: ids,
    });
    if (ids.length === 1) {
      GameEvents.successInvitedFriendsNextRewards(ids[0]);
    } else {
      GameEvents.successInvitedFriendsCollectAll(ids);
    }
    store$.markClaimed(ids);
  };

  const claimingBatches = store$.dialogState.batches;

  return {
    isOpen: store$.dialogState.isOpen,
    isSingleClaim: claimingBatches.length === 1,
    currentBatchIndex: store$.dialogState.currentIndex,
    currentFriendName:
      claimingBatches[store$.dialogState.currentIndex]?.triggeredByUserName,
    totalBatchesClaiming: claimingBatches.length,
    totalBatchesAvailable: store$.batches.length,
    isLastBatch: store$.dialogState.currentIndex === claimingBatches.length - 1,
    rewards: claimingBatches[store$.dialogState.currentIndex]?.rewards ?? [],
    isOverflowInventoryError: !!store$.dialogState.inventoryOverflow,
    exceedLimitItems: store$.dialogState.inventoryOverflow?.items ?? [],
    isClaimPending,
    async tryClaimCurrent() {
      // claim current batch and move to next

      // check overflow with user inventory
      const currentBatch = claimingBatches[store$.dialogState.currentIndex];
      const exceedItems = getExceedItems([currentBatch], store$.userInventory);

      if (exceedItems.length > 0) {
        store$.setInventoryOverflow({
          items: exceedItems,
          batchesIds: [currentBatch.batchId],
        });
        return;
      }

      // if everything is ok, claim current batch
      await requestClaim([currentBatch.batchId]);
    },
    async claimWithOverflow() {
      await requestClaim(store$.dialogState.inventoryOverflow!.fromBatches);
    },
    async tryClaimAll() {
      // claim all and close dialog
      // check overflow with user inventory
      const batches = claimingBatches.filter((x) => !x.isClaimed);
      const exceedItems = getExceedItems(batches, store$.userInventory);
      if (exceedItems.length > 0) {
        store$.setInventoryOverflow({
          items: exceedItems,
          batchesIds: batches.map((x) => x.batchId),
        });
        return;
      }

      await requestClaim(batches.map((x) => x.batchId));
    },
    openClaimRewards() {
      store$.openDialog();
    },
    close() {
      store$.closeDialog();
    },
  };
}

function mapBatch(batch: API.ReferralRewardBatch): RewardsBatch {
  const rewards: RewardsBatchItem[] = [];
  for (const item of batch.claimableArtifacts) {
    rewards.push(item);
  }
  if (batch.newGiftSlotsAmount > 0) {
    rewards.push({
      newSlots: batch.newGiftSlotsAmount,
    });
  }
  if (batch.itemRegenerationTime > 0) {
    rewards.push({
      cooldownReductionMinutes: millisecondsToMinutes(
        batch.itemRegenerationTimeDelta
      ),
    });
  }
  if (batch.canSeeFailedCrafts) {
    rewards.push({
      failedCraftsTipUnlocked: true,
    });
  }
  return {
    batchId: batch._id,
    triggeredByUserName: batch.triggeredByUser
      ? formatPersonName({
          firstName: batch.triggeredByUser.first_name,
          lastName: batch.triggeredByUser.last_name,
          username: batch.triggeredByUser.username,
        })
      : null,
    rewards,
  };
}

function millisecondsToMinutes(ms: number): number {
  return Math.floor(ms / 1000 / 60);
}
