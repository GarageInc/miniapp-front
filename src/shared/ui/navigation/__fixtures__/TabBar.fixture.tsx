import { ROUTES } from "@/shared/routing";
import { TabBar, TabBarItem } from "@/shared/ui/navigation";

export default (
  <TabBar className="w-full">
    <TabBarItem to={ROUTES.craft} iconVariant="craft">
      Craft
    </TabBarItem>
    <TabBarItem to={ROUTES.friends} iconVariant="friends">
      Friends
    </TabBarItem>
    <TabBarItem to={ROUTES.wallet} iconVariant="wallet">
      Wallet
    </TabBarItem>
  </TabBar>
);
