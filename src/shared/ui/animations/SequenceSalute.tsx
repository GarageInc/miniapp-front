import padStart from "lodash/padStart";
import { HTMLAttributes, useEffect, useRef } from "react";
import { Helmet } from "react-helmet";
import { FastImageSequence } from "@mediamonks/fast-image-sequence";

import { loadImg } from "@/shared/utils/media";

const FRAMES = 31;

export function getFrameImgUrl(index: number) {
  return `/sequence/salute/Explosion-to-export_${padStart(index.toString(), 5, "0")}.webp`;
}

export function preloadSequenceSalute() {
  return Array(FRAMES)
    .fill(0)
    .map((_, i) => loadImg(getFrameImgUrl(i)));
}

export function SequenceSalutePrefetchHelmet() {
  return (
    <Helmet>
      {Array(FRAMES)
        .fill(0)
        .map((_, i) => (
          <link key={i} rel="prefetch" href={getFrameImgUrl(i)} as="image" />
        ))}
    </Helmet>
  );
}

export function SequenceSalute({
  onLoad,
  isPlay,
  delay = 0,
  ...props
}: HTMLAttributes<HTMLDivElement> & {
  onLoad?: () => void;
  isPlay: boolean;
  delay: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const sequenceRef = useRef<FastImageSequence | null>(null);

  useEffect(() => {
    if (!ref.current) {
      return;
    }
    if (sequenceRef.current) {
      return;
    }

    sequenceRef.current = new FastImageSequence(ref.current, {
      frames: FRAMES,
      imageURLCallback: getFrameImgUrl,
      clearCanvas: true,
    });
    sequenceRef.current.onLoadProgress((progress) => {
      if (progress === 1) onLoad?.();
    });

    return () => {
      sequenceRef.current?.destruct();
      sequenceRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (sequenceRef.current) {
      setTimeout(() => {
        sequenceRef.current!.play();
      }, delay);
    }
  }, [isPlay, delay]);

  return <div ref={ref} {...props} />;
}
