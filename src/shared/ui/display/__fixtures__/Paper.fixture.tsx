import { Paper } from "../Paper";

export default (
  <div className="flex flex-col space-y-3 py-10 px-2 bg-sunburst-purple h-screen bg-cover bg-fixed">
    <Paper
      variant="transculent"
      className="flex justify-between items-center font-medium font-display leading-tight"
    >
      <div>Balance:</div>
      <div>100 TON</div>
    </Paper>
    <Paper variant="solid">
      <p className="text-center">
        Invite more friends and get additional slots with rewards boxes and
        speed up the cooldown of rewards.
      </p>
    </Paper>
  </div>
);
