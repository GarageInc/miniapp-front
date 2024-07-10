import { VideoSalute } from "../VideoSalute";

export default (
  <div>
    <div className="w-screen bg-red-500 h-[100px]"></div>
    <VideoSalute
      isPlay
      delay={200}
      className="absolute inset-0 w-screen max-w-[var(--max-container-width)] aspect-square"
    />
  </div>
);
