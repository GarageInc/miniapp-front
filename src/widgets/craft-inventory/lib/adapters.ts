export function mapCraftResult(
  data: API.MatchArtifactsResult,
  [leftItem, rightItem]: [API.Artifact, API.Artifact]
): CraftResult {
  let sourceSurvived: API.Artifact | null = null;
  if (data.lost) {
    if (data.lost.id === leftItem.id) {
      sourceSurvived = rightItem;
    } else {
      sourceSurvived = leftItem;
    }
  }
  return {
    artifact: (data?.crafted || data?.lost)!,
    sourceItemLeft: leftItem,
    sourceItemRight: rightItem,
    sourceSurvived,
    isObtained: !!data?.crafted,
    isLost: !!data?.lost,
    isNew: data.isNewCraftedPair,
    isLevelUp: data.isLevelUp,
    levelUpRewards: data.gifts ?? [],
  };
}
