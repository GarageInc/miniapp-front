import { default as ga, GameAnalytics } from "gameanalytics";

export class GameEvents {
  static appFirstLaunch(source?: string | null) {
    GameAnalytics.addDesignEvent("app_first_launch", 1);
    GameAnalytics.addProgressionEvent(
      ga.EGAProgressionStatus.Start,
      "FirstLaunch",
      source ?? null
    );
  }

  static sessionStart(sessionNumber: number, source?: string | null) {
    GameAnalytics.addProgressionEvent(
      ga.EGAProgressionStatus.Start,
      "Session",
      sessionNumber.toString(),
      source ?? null,
      sessionNumber
    );

    GameAnalytics.addDesignEvent("session_start", sessionNumber);
  }

  static sessionEnd(sessionNumber: number) {
    GameAnalytics.addProgressionEvent(
      ga.EGAProgressionStatus.Complete,
      "Session",
      sessionNumber.toString(),
      null,
      sessionNumber
    );
  }

  static unlockSlot(slotNumber: number) {
    //GameAnalytics.addDesignEvent(`unlock_slot_${slotNumber}`, 1);
    GameAnalytics.addDesignEvent(`unlock_slot:${slotNumber}`, 1);
  }

  static collectSlotReward(
    slotNumber: number,
    rewards: string[],
    cooldownTime: string
  ) {
    GameAnalytics.addDesignEvent(`collect_slot_reward`, 1, {
      slotNumber: slotNumber.toString(),
      rewards: rewards.join(","),
      cooldownTime: cooldownTime,
    });
    rewards.forEach((reward) => {
      GameAnalytics.addResourceEvent(
        ga.EGAResourceFlowType.Source,
        "item",
        1,
        "box",
        reward
      );
    });
  }

  static tapButtonCraftElements() {
    GameAnalytics.addDesignEvent("tap_button_craft_elements", 1);
    GameAnalytics.addDesignEvent("click:craft_button", 1);
  }

  static successCraft(resultElementName: string, sourceElements: string[]) {
    GameAnalytics.addDesignEvent("success_craft", 1, {
      result: resultElementName,
      source1: sourceElements[0],
      source2: sourceElements[1],
    });
    GameAnalytics.addDesignEvent("event:success_craft:" + resultElementName, 1);
    GameAnalytics.addResourceEvent(
      ga.EGAResourceFlowType.Source,
      "item",
      1,
      "craft",
      resultElementName
    );
    GameAnalytics.addResourceEvent(
      ga.EGAResourceFlowType.Sink,
      "item",
      1,
      "craft",
      sourceElements[0]
    );
    GameAnalytics.addResourceEvent(
      ga.EGAResourceFlowType.Sink,
      "item",
      1,
      "craft",
      sourceElements[1]
    );
  }

  static unsuccessCraft(lostElementName: string, sourceElements: string[]) {
    GameAnalytics.addDesignEvent("unsuccess_craft", 1, {
      lost: lostElementName,
      source1: sourceElements[0],
      source2: sourceElements[1],
    });
    GameAnalytics.addDesignEvent("event:unsuccess_craft", 1);
    GameAnalytics.addResourceEvent(
      ga.EGAResourceFlowType.Sink,
      "item",
      1,
      "craft",
      lostElementName
    );
  }

  static tapInviteFriends(friendsQuantity: number, screen: string) {
    GameAnalytics.addDesignEvent("tap_invite_friends", 1, {
      friendsQuantity: friendsQuantity.toString(),
      screen,
    });
    GameAnalytics.addDesignEvent("click:invite_friend", friendsQuantity);
  }

  static collectBonusRewards(rewardElementIds: string[]) {
    GameAnalytics.addDesignEvent("collect_bonus_rewards", 1, {
      rewardElementIds: rewardElementIds.join(","),
    });
    GameAnalytics.addDesignEvent("action:collect_bonus_rewards", 1);
  }

  static connectWalletTap() {
    GameAnalytics.addDesignEvent("connect_wallet_tap", 1);
    GameAnalytics.addDesignEvent("click:connect_wallet", 1);
  }

  static successConnectWallet(walletBalance: string) {
    GameAnalytics.addDesignEvent("success_connect_wallet", 1, {
      balance: walletBalance,
    });
    GameAnalytics.addDesignEvent("event:success_wallet_connect", 1);
    GameAnalytics.addBusinessEvent(
      "TON",
      walletBalance,
      "connect_wallet_balance",
      "wallet"
    );
  }

  static disconnectWallet() {
    GameAnalytics.addDesignEvent("event:disconnect_wallet", 1);
  }

  static levelUp(
    level: number,
    rewardElementIds: string[],
    rewardWithNewLvlId: string,
    elementsForCraftIds: string[]
  ) {
    GameAnalytics.addProgressionEvent(
      ga.EGAProgressionStatus.Complete,
      "Level",
      level.toString(),
      "craft",
      level,
      {
        level,
        rewardElementIds: rewardElementIds.join(","),
        rewardWithNewLvlId,
        elementsForCraftIds: elementsForCraftIds.join(","),
      }
    );

    GameAnalytics.addDesignEvent("level_up", level, {
      level,
      rewardElementIds,
      rewardWithNewLvlId,
      elementsForCraftIds,
    });
  }

  static tapButtonMint(screen: string, elementId: string) {
    GameAnalytics.addDesignEvent("tap_button_mint", 1, {
      screen,
      elementId,
    });
  }

  static tapButtonMintContinue(elementId: string) {
    GameAnalytics.addDesignEvent("tap_button_mint_continue", 1, {
      elementId,
    });
  }

  static tapButtonMintCancel(elementId: string) {
    GameAnalytics.addDesignEvent("tap_button_mint_cancel", 1, {
      elementId,
    });
  }

  static successMint(elementId: string) {
    GameAnalytics.addDesignEvent("success_mint", 1, {
      elementId,
    });
  }

  static collectNft(nftId: string) {
    GameAnalytics.addDesignEvent("collect_nft", 1, {
      nftId,
    });
  }

  static tapButtonSend1(nftId: string) {
    GameAnalytics.addDesignEvent("tap_button_send_1", 1, {
      nftId,
    });
  }

  static tapButtonSend2(nftId: string) {
    GameAnalytics.addDesignEvent("tap_button_send_2", 1, {
      nftId,
    });
  }

  static successSend(nftId: string) {
    GameAnalytics.addDesignEvent("success_send", 1, {
      nftId,
    });
  }

  static tapButtonUse1(elementId: string) {
    GameAnalytics.addDesignEvent("tap_button_use_1", 1, {
      elementId,
    });
  }

  static tapButtonUse2(elementId: string) {
    GameAnalytics.addDesignEvent("tap_button_use_2", 1, {
      elementId,
    });
  }

  static tapButtonUseCancel(elementId: string) {
    GameAnalytics.addDesignEvent("tap_button_use_cancel", 1, {
      elementId,
    });
  }

  static successUsed(elementId: string) {
    GameAnalytics.addDesignEvent("success_used", 1, {
      elementId,
    });
  }

  static tapButtonGGCollection() {
    GameAnalytics.addDesignEvent("tap_button_gg", 1);
  }

  static successInvitedFriends(friendsQuantity: number) {
    GameAnalytics.addDesignEvent("success_invited_friends", friendsQuantity, {
      friendsQuantity: friendsQuantity.toString(),
    });
  }

  static successInvitedFriendsNextRewards(friendId: string) {
    GameAnalytics.addDesignEvent("success_invited_friends_next_rewards", 1, {
      friendId,
    });
  }

  static successInvitedFriendsCollectAll(friendIds: string[]) {
    GameAnalytics.addDesignEvent("success_invited_friends_collect_all", 1, {
      friendIds: friendIds.join(","),
    });
  }

  static clickLadder() {
    GameAnalytics.addDesignEvent("click:ladder_click", 1);
  }
  static clickMarket() {
    GameAnalytics.addDesignEvent("click:market_click", 1);
  }
  static clickCollectBox() {
    GameAnalytics.addDesignEvent("click:collect_box", 1);
  }
  static clickLootboxGetItButton() {
    GameAnalytics.addDesignEvent("click:box_reward_get_it", 1);
  }
  static clickElementInfo(elementName: string) {
    GameAnalytics.addDesignEvent(`click:information:${elementName}`, 1);
  }
  static clickCloseElementInfo() {
    GameAnalytics.addDesignEvent(`click:information_continue`, 1);
  }
  static clickSuccessCraftContinue() {
    GameAnalytics.addDesignEvent(`click:success_craft_continue_click`, 1);
  }
  static clickFailCraftContinue() {
    GameAnalytics.addDesignEvent(`click:fail_craft_continue_click`, 1);
  }
  static clickLadderFriends() {
    GameAnalytics.addDesignEvent(`click:ladder_friends_click`, 1);
  }
  static clickLadderAll() {
    GameAnalytics.addDesignEvent(`click:ladder_all_click`, 1);
  }
  static clickLadderInviteButton() {
    GameAnalytics.addDesignEvent(`click:ladder_invite_button_click`, 1);
  }
  static clickViewFriend(friend: string) {
    GameAnalytics.addDesignEvent(`click:view_friend_click:${friend}`, 1);
  }
  static clickFriendsInviteAlert() {
    GameAnalytics.addDesignEvent(`click:friends_invite_click`, 1);
  }
}

export default GameEvents;
