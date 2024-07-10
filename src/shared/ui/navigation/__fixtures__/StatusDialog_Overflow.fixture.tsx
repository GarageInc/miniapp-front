import { StatusDialog } from "../StatusDialog";

export default (
  <StatusDialog
    isOpen
    title="Success Craft!"
    iconVariant="success"
    submitText="Mint"
    bg="success"
  >
    <div>
      Many content
      <div className="h-[200vh] w-10 bg-[red]" />
    </div>
  </StatusDialog>
);
