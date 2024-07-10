import { FC } from "react";

import { useUser } from "@/shared/api";

export const LootboxAvailableIndicator: FC = () => {
  const { data } = useUser();
  if (data?.claimableSlots?.length) {
    if (hasAnyPastDate(data.claimableSlots)) {
      return (
        <img
          className="w-6 h-6"
          style={{
            filter: "drop-shadow(0px 0px 5px #FF2E00)",
          }}
          src="/images/indicator-attention.png"
          alt="lootbox available"
        />
      );
    }
  }

  return null;
};

function hasAnyPastDate(dates: string[]): boolean {
  return dates.some((date) => new Date(date) < new Date());
}
