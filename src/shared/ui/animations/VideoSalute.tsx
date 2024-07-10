import { HTMLAttributes, useEffect, useRef } from "react";

import { getVideoFormat } from "@/shared/utils/media";

export function VideoSalute({
  isPlay,
  delay = 0,
  ...props
}: HTMLAttributes<HTMLVideoElement> & {
  isPlay: boolean;
  delay: number;
}) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (ref.current) {
      setTimeout(() => {
        ref.current!.play();
      }, delay);
    }
  }, [isPlay, delay]);

  return (
    <video
      muted
      playsInline
      src={`/salute.${getVideoFormat()}`}
      ref={ref}
      {...props}
    />
  );
}
