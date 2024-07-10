type CraftResult = {
  artifact: API.Artifact;
  sourceItemLeft: API.Artifact;
  sourceItemRight: API.Artifact;
  // one of sources which was not lost
  sourceSurvived: API.Artifact | null;
  isObtained: boolean;
  isLost: boolean;
  isNew: boolean;
  isLevelUp: boolean;
  levelUpRewards: API.Artifact[];
};
