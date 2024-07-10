import { FC, useEffect, useState } from "react";

import { formatTimeLeft } from "@/shared/utils/formatTimeLeft";

export const DisplayTimer: FC<{
  timerEnd: Date;
  disableTimeRounding?: boolean;
  className?: string;
}> = ({ timerEnd, disableTimeRounding, className }) => {
  const [displayedTime, setDisplayedTime] = useState(
    formatTimeLeft(timerEnd, !disableTimeRounding)
  );

  useEffect(() => {
    const t = setInterval(() => {
      setDisplayedTime(formatTimeLeft(timerEnd, !disableTimeRounding));
    }, 1000);

    return () => {
      clearTimeout(t);
    };
  }, [timerEnd]);

  return <span className={className}>{displayedTime}</span>;
};
