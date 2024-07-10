declare namespace API {
  type Artifact = {
    id: string;
    name: string;
    description: string;
    logoUrl: string;
    mintingPrice: string;
    level: number;
    createdAt: DateString;
    updatedAt: DateString;
    backgroundColor: string;
    strokeColor: string;
    thumbnailUrl: string;
    gifUrl: string;
  };

  type InventoryItem = {
    artifact: Artifact;
    count: number;
    maxAmount: number;
  };

  type RefCode = {
    _id: string;
    code: string;
    created: string;
  };

  type Pair = {
    _id: string;
    firstId: string;
    secondId: string;
    created: string;
    updated: string;
  };

  type User = {
    _id: string;
    id: number;
    username: string;
    referredByCode: string;
    chatId: string;
    telegramId: string;
    created: string;
    updated: string;
    lastActiveDate: Date;
    inventory: InventoryItem[];
    craftedHistory: Pair[];
    claimableSlots: Slot[];
    currentElementsCount: number;
    inventorySize: number;
    maxInventorySize: number;
    level: number;
    photoUrl?: string | null;
    claimableRewardsAmount: number;
    canSeeFailedCrafts: boolean;
    amountUsersLeftToNewSlot: number;
    language: string;
  };

  type Friend = {
    _id: string;
    telegramId: number;
    first_name: string;
    last_name: string;
    username: string;
    language: string;
    referredByCode: string;
    level: number;
    maxInventorySize: number;
    currentElementsCount: number;
    photoUrl?: string | null;
    inventory: InventoryItem[];
  };

  type DateString = string;

  type Slot = DateString;

  type MatchArtifactsResult = {
    error?: string;
    crafted?: Artifact;
    lost?: Artifact;
    user: User;
    isLevelUp: boolean;
    isNewCraftedPair: boolean;
    gifts?: Artifact[];
    remainingUsersForFailedCraftsView: number;
  };

  type NftItem = {
    address: string;
    collection_address: string;
    owner_address: string;
    init: boolean;
    index: string;
    last_transaction_lt: string;
    code_hash: string;
    data_hash: string;
    content: {
      uri: string;
    };
    collection: {
      address: string;
      owner_address: string;
      last_transaction_lt: string;
      next_item_index: string;
      collection_content: {
        uri: string;
      };
      code_hash: string;
      data_hash: string;
    };
  };

  type ReferralRewardBatch = {
    _id: string;
    claimableArtifacts: Array<{
      artifact: Artifact;
      count: number;
    }>;
    triggeredByUser: Friend;
    level: number;
    itemRegenerationTime: number;
    itemRegenerationTimeDelta: number;
    giftSlotsAmount: number;
    newGiftSlotsAmount: number;
    isClaimed: boolean;
    canSeeFailedCrafts: boolean;
  };

  type LevelLeaderboardItem = {
    id: string;
    username: string;
    photoUrl: string | null;
    first_name: string;
    last_name: string;
    level: number;
  };

  type CraftLeaderboardItem = {
    id: string;
    username: string;
    photoUrl: string | null;
    first_name: string;
    last_name: string;
    craftedAmount: number;
    level: number;
  };

  type ReferrerLeaderboardItem = {
    id: string;
    username: string;
    photoUrl: string | null;
    first_name: string;
    last_name: string;
    invitedUsersAmount: number;
    level: number;
  };

  type CraftRecord = {
    first: Artifact;
    second: Artifact;
    matchResult: Artifact;
  };
}
