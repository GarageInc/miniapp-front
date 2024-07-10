import { Paper } from "@/shared/ui/display/Paper";

import { TabItem, Tabs } from "../Tabs";

export default (
  <div className="p-4">
    <Tabs>
      <TabItem content={<Paper>Content 1</Paper>}>Tab 1</TabItem>
      <TabItem content={<Paper>Content 2</Paper>}>Tab 2</TabItem>
      <TabItem content={<Paper>Content 3</Paper>}>Tab 3</TabItem>
    </Tabs>
  </div>
);
