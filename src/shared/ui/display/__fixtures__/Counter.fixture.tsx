import { Counter } from "../Counter";

export default (
  <div className="flex flex-col space-y-3 py-10 px-2 bg-sunburst-purple h-screen bg-cover bg-fixed">
    <div className="flex space-x-2">
      <Counter quantity={1} />
      <Counter quantity={69} />
      <Counter quantity={9999} />
      <Counter quantity={"+1"} />
    </div>
    <div className="flex space-x-2">
      <Counter quantity={2} variant="dark" />
      <Counter quantity={2} variant="green" />
      <Counter quantity={2} variant="red" />
    </div>
  </div>
);
