import { useEffect, useState } from "react";

import { parseDate, useClaimFirstGiftBox, useUser } from "@/shared/api";

type SlotData = {
  isLocked?: boolean;
  isReady?: boolean;
  claimableAt?: Date;
};

const MAX_SLOTS = 6;

let giftSeq = 0;

const nextGiftSeq = () => ++giftSeq;

export function useRewards() {
  const { data: user, isSuccess } = useUser();
  const [slots, setSlots] = useState<SlotData[]>([]);
  const [gifts, setGifts] = useState<Array<API.Artifact & { seq: number }>>([]);

  useEffect(() => {
    // initial set slots
    const initialSlots = (user?.claimableSlots ?? [])
      .map((str) => parseDate(str as string))
      .filter(Boolean)
      .sort((a, b) => (a as Date).getTime() - (b as Date).getTime())
      .map(mapSlot);
    const lockedSlots = Array(MAX_SLOTS - initialSlots.length).fill({
      isLocked: true,
    });
    setSlots([...initialSlots, ...lockedSlots]);
    // update slot data if ready
    const int = setInterval(() => {
      setSlots((slots) =>
        slots.map((s) => {
          if (s.claimableAt && isPast(s.claimableAt)) {
            return { isReady: true };
          }
          return s;
        })
      );
    }, 1000);

    return () => {
      clearInterval(int);
    };
  }, [user]);

  const { mutateAsync: claimFirst } = useClaimFirstGiftBox();

  const claimableCount = slots.filter((slot) => slot.isReady).length;

  return {
    slots: slots,
    claimableCount,
    isClaimable: claimableCount > 0,
    isSuccess,
    gifts: gifts,
    remainingFriendsToUnlockNewSlot: user?.amountUsersLeftToNewSlot ?? 0,
    beginClaimBox() {
      claimFirst().then(({ gifts }) => {
        setGifts((cur) => [
          ...cur,
          ...gifts.map((g) => ({ ...g, seq: nextGiftSeq() })),
        ]);
      });
    },
    finishClaimBox() {
      setGifts([]);
    },
  };
}

function mapSlot(claimableAt: Date | null): SlotData {
  if (claimableAt == null) {
    return {
      isLocked: true,
    };
  }

  if (isPast(claimableAt)) {
    return {
      isReady: true,
    };
  }

  return {
    claimableAt,
  };
}

function isPast(timerEnd: Date): boolean {
  return timerEnd < new Date();
}
