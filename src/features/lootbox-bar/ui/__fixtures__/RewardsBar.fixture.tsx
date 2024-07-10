import { LootboxBarContainer } from "../LootboxBarContainer";
import { LootboxBarItem } from "../LootboxBarItem";

const Full = () => (
  <LootboxBarContainer>
    <LootboxBarItem isReady />
    <LootboxBarItem isReady />
    <LootboxBarItem claimableAt={new Date(+new Date() + 1000 * 60)} />
    <LootboxBarItem isLocked />
    <LootboxBarItem isLocked />
    <LootboxBarItem isLocked />
  </LootboxBarContainer>
);

const Partial = () => (
  <LootboxBarContainer>
    <LootboxBarItem isReady />
    <LootboxBarItem isReady />
    <LootboxBarItem claimableAt={new Date(+new Date() + 10 * 1000 * 60)} />
  </LootboxBarContainer>
);

export default (
  <div className="flex flex-col space-y-2">
    <Full />
    <Partial />
  </div>
);
