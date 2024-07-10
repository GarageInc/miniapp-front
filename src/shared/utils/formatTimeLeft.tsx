import { ReactNode } from "react";
import { Trans } from "@lingui/macro";

// only minutes and seconds are displayed
export function formatTimeLeft(
  timerEnd: Date,
  roundToHours?: boolean
): ReactNode | string {
  const now = new Date();
  const diff = timerEnd.getTime() - now.getTime();

  if (diff < 0) {
    return "0:00";
  }

  const minutes = Math.floor(diff / 60000);
  const seconds = Math.floor((diff % 60000) / 1000);

  if (roundToHours && minutes > 60) {
    const hours = Math.floor(minutes / 60);
    return <Trans>&gt; {hours}hr</Trans>;
  }

  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}
