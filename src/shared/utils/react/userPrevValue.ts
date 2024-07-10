import { useEffect, useRef, useState } from "react";

export function usePrevValue<T>(value: T) {
  const ref = useRef<T | null>(null);
  const [prevValue, setPrevValue] = useState<T | null>(null);

  useEffect(() => {
    if (ref.current !== value) {
      setPrevValue(ref.current);
      ref.current = value;
    }
  }, [value]);

  return prevValue;
}
