import padStart from "lodash/padStart";
import { HTMLAttributes, useEffect, useRef } from "react";
import { FastImageSequence } from "@mediamonks/fast-image-sequence";

export function SequenceLootbox({
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
      frames: 106,

      imageURLCallback: (index) =>
        `/sequence/lootbox/OUT_${padStart(index.toString(), 5, "0")}.webp`,

      // // Or you can load images from a tar file
      // tarURL: "/sequence/salut.tar",
      // tarImageURLCallback: (index) =>
      //   `Explosion-to-export_${padStart(index.toString(), 5, "0")}.webp`,

      loop: false,
      // objectFit: "contain",
      // preloadAllTarImages: true,
      // showDebugInfo: true,
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
