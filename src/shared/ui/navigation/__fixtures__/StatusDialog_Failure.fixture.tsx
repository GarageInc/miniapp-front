import { StatusDialog } from "../StatusDialog";

export default (
  <StatusDialog
    isOpen
    title="Oops..."
    description="There is no crafting available  with these pair of elements"
    iconVariant="error"
    submitText="Tap to continue"
    bg="fail"
    submitButtonProps={{
      color: "gray",
    }}
  >
    <div>
      {"<"}content{">"}
    </div>
  </StatusDialog>
);
