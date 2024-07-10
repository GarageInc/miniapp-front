import { StatusDialog } from "../StatusDialog";

export default (
  <StatusDialog
    isOpen
    title="Level Up!"
    description="Congratulations, you have reached a new level!"
    iconVariant="lootbox"
    submitText="Tap to continue"
    bg="info"
    submitButtonProps={{
      color: "gray",
    }}
  >
    <div>
      {"<"}content{">"}
    </div>
  </StatusDialog>
);
