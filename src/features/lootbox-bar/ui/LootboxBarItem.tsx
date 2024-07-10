import { AnimatePresence, motion, Variants } from "framer-motion";
import { FC, HTMLAttributes, useState } from "react";
import { Trans } from "@lingui/macro";

import { Tooltip } from "@/shared/ui/overlays/Tooltip";

import clockUrl from "@/assets/illustrations/Clock.png?w=48&h=48&format=webp&imagetools";
import chestClosedUrl from "@/assets/illustrations/Gift_lock.png?w=84&h=84&format=webp&imagetools";
import chestOpenedUrl from "@/assets/illustrations/Gift_unlock.png?w=84&h=84&format=webp&imagetools";
import lockUrl from "@/assets/illustrations/Lock.png?w=48&h=48&format=webp&imagetools";

import { DisplayTimer } from "./DisplayTimer";

export type LootboxBarItemProps = {
  isLocked?: boolean;
  isReady?: boolean;
  disableTimeRounding?: boolean;
  isOpened?: boolean;
  claimableAt?: Date;
  remainingFriendsToUnlock?: number;
} & HTMLAttributes<HTMLDivElement>;

const itemVariant: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.5,
    transition: {
      duration: 0.25,
    },
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.25,
    },
  },
};

const getRandomDelay = () => -(Math.random() * 0.5 + 0.05);

const randomDuration = () => Math.random() * 0.3 + 0.42;

const getRandomTransformOrigin = () => {
  const value = (16 + 40 * Math.random()) / 100;
  const value2 = (15 + 36 * Math.random()) / 100;
  return {
    originX: value,
    originY: value2,
  };
};
export const LootboxBarItem: FC<LootboxBarItemProps> = ({
  isReady,
  isLocked,
  disableTimeRounding,
  claimableAt,
  isOpened,
  remainingFriendsToUnlock,
  ...props
}) => {
  const [transformOriginStyle] = useState(getRandomTransformOrigin());

  const borderCls = isReady ? "shadow-gift-gold" : "shadow-gift-regular";
  const opacityCls = isLocked ? "opacity-50" : "opacity-100";

  const content = (
    <div
      {...props}
      className={`relative pt-[100%] rounded-lg bg-black font-bold text-t4 sm:text-t5 tracking-tight transition-all ${borderCls} ${opacityCls}`}
    >
      <AnimatePresence initial={true}>
        {isReady && (
          <motion.div
            key="ready"
            variants={itemVariant}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className={`absolute inset-1 flex flex-col items-center justify-center`}
          >
            <motion.img
              src={isOpened ? chestOpenedUrl : chestClosedUrl}
              alt=""
              className="w-[42px] h-[42px]"
              style={{
                ...transformOriginStyle,
              }}
              animate={{
                x: [1, -1, -3, 3, 1, -1, -3, 3, -1, 1, 1],
                // y: [1, -2, 0, 2, -1, 2, 1, 1, -1, 2, -2],
                rotate: [0, -5, 5, 0, 5, -5, 0, -5, 5, 0, -5],
              }}
              transition={{
                delay: getRandomDelay(),
                repeatType: "reverse",
                repeat: Infinity,
                repeatDelay: 3,
                duration: randomDuration(),
              }}
            />
          </motion.div>
        )}
        {isLocked && (
          <motion.div
            key="locked"
            variants={itemVariant}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className={`absolute inset-0 p-1 pt-2 flex flex-col items-center justify-center space-y-0.5`}
          >
            <span className="uppercase">
              <Trans>Locked</Trans>
            </span>
            <img
              src={lockUrl}
              className="text-white/[.4] relative w-6 h-6 sm:w-5 sm:h-5"
            />
          </motion.div>
        )}
        {claimableAt && (
          <motion.div
            key="timer"
            variants={itemVariant}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className={`absolute inset-0 p-1 pt-2 flex flex-col items-center justify-center space-y-0.5`}
          >
            <DisplayTimer
              timerEnd={claimableAt}
              className="text-t3 lg:text-t4"
              disableTimeRounding={disableTimeRounding}
            />
            <img src={clockUrl} className={`relative w-6 h-6 sm:w-5 sm:h-5`} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  if (isLocked && remainingFriendsToUnlock) {
    return (
      <Tooltip
        content={
          <div className="text-center">
            Invite {remainingFriendsToUnlock} more friend
            {remainingFriendsToUnlock > 1 ? "s" : ""} to unlock slot
          </div>
        }
        maxWidth={160}
      >
        {content}
      </Tooltip>
    );
  }

  return content;
};
