import { StatusDialog } from "../StatusDialog";

export default (
  <StatusDialog
    isOpen
    title="Success Craft!"
    secondTitle="Unlocked new Element"
    iconVariant="success"
    submitText="Mint"
    bg="success"
  >
    <div>
      {"<"}content{">"}
    </div>
  </StatusDialog>
);
