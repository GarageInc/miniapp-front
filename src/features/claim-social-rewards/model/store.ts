import { create } from "zustand";

type ArtifactCount = {
  artifact: API.Artifact;
  count: number;
};

export type RewardsBatchItem =
  | {
      artifact: API.Artifact;
      count: number;
    }
  | {
      cooldownReductionMinutes: number;
    }
  | {
      newSlots: number;
    }
  | {
      failedCraftsTipUnlocked: true;
    };

export type RewardsBatch = {
  batchId: string;
  rewards: RewardsBatchItem[];
  triggeredByUserName: string | null;
  isClaimed?: boolean;
};

type SocialRewardsState = {
  userInventory: API.InventoryItem[];
  dialogState: {
    isOpen: boolean;
    // batches shown to user in claim dialog
    batches: RewardsBatch[];
    // current unclaimed batch index
    currentIndex: number;
    // when is not empty warning dialog will be shown
    inventoryOverflow: {
      items: ArtifactCount[];
      fromBatches: string[];
    } | null;
  };
  hasShownOnce: boolean;
  batches: RewardsBatch[];
};

type SocialRewardsActions = {
  openDialog: () => void;
  closeDialog: () => void;
  setRewards: (batches: RewardsBatch[]) => void;
  setUserInventory: (inventory: API.InventoryItem[]) => void;
  setBatchIndex: (index: number) => void;
  setInventoryOverflow: (overflowData: {
    items: ArtifactCount[];
    batchesIds: string[];
  }) => void;
  markClaimed: (batchesIds: string[]) => void;
  reset: () => void;
};

const initialState: SocialRewardsState = {
  userInventory: [],
  dialogState: {
    isOpen: false,
    currentIndex: 0,
    batches: [],
    inventoryOverflow: null,
  },
  hasShownOnce: false,
  batches: [],
};

export const useSocialRewardsStore = create<
  SocialRewardsState & SocialRewardsActions
>((set) => ({
  ...initialState,
  openDialog: () =>
    set((state) => ({
      ...state,
      dialogState: {
        isOpen: true,
        batches: [...state.batches],
        currentIndex: 0,
        inventoryOverflow: null,
      },
      hasShownOnce: true,
    })),
  closeDialog: () =>
    set((state) => ({
      ...state,
      dialogState: {
        ...state.dialogState,
        isOpen: false,
      },
    })),
  setRewards: (batches: RewardsBatch[]) => set({ batches }),
  setUserInventory: (inventory: API.InventoryItem[]) =>
    set({ userInventory: inventory }),
  setBatchIndex: (index: number) =>
    set((state) => ({
      ...state,
      dialogState: {
        ...state.dialogState,
        currentIndex: index,
      },
    })),
  setInventoryOverflow: ({
    items,
    batchesIds,
  }: {
    items: ArtifactCount[];
    batchesIds: string[];
  }) =>
    set((state) => ({
      ...state,
      dialogState: {
        ...state.dialogState,
        inventoryOverflow: {
          items,
          fromBatches: batchesIds,
        },
      },
    })),
  markClaimed: (batchesIds: string[]) =>
    set((state) => {
      const newBatches = state.dialogState.batches.map((batch) => {
        if (batchesIds.includes(batch.batchId)) {
          return {
            ...batch,
            isClaimed: true,
          };
        }
        return batch;
      });

      const isFinished = newBatches.every((x) => x.isClaimed);

      return {
        ...state,
        dialogState: {
          inventoryOverflow: null,
          batches: newBatches,
          isOpen: !isFinished,
          currentIndex: isFinished
            ? 0
            : newBatches.findIndex((x) => !x.isClaimed),
        },
      };
    }),
  reset: () => initialState,
}));

export const useSocialRewardsStoreSelector = () =>
  useSocialRewardsStore((state) => ({
    ...state,
  }));

function applyToInventoryCounts(
  inventory: API.InventoryItem[],
  items: ArtifactCount[]
) {
  return items.reduce((inv, item) => {
    const inventoryItem = inv.find((i) => i.artifact.id === item.artifact.id);
    if (!inventoryItem) {
      return inv;
    }
    return inv.map((i) => {
      if (i.artifact.id === item.artifact.id) {
        return {
          ...i,
          count: i.count + item.count,
        };
      }
      return i;
    });
  }, inventory);
}

export function getExceedItems(
  batches: RewardsBatch[],
  inventory: API.InventoryItem[]
): ArtifactCount[] {
  const newInventoryState = applyToInventoryCounts(
    inventory,
    batches
      .flatMap((x) => x.rewards)
      .filter((x) => "artifact" in x)
      .map((batchItem) => {
        const artifactItem = batchItem as {
          artifact: API.Artifact;
          count: number;
        };

        return {
          artifact: artifactItem.artifact,
          count: artifactItem.count,
        };
      })
  );

  // get all inventory items with counts exceeded maxAmount
  return newInventoryState
    .filter((item) => item.count > item.maxAmount)
    .map((item) => {
      const exceedCount = item.count - item.maxAmount;
      return {
        artifact: item.artifact,
        count: exceedCount,
      };
    });
}
