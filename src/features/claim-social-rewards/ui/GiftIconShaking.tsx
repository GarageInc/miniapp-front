import { motion } from "framer-motion";

export const GiftIconShaking = () => {
  return (
    <motion.img
      className="w-6 h-6"
      style={{
        filter: "drop-shadow(0px 0px 5px #F19D1F)",
      }}
      src="/images/indicator-gift.png"
      alt="lootbox available"
      animate={{
        x: [1, -1, -3, 3, 1, -1, -3, 3, -1, 1, 1],
        // y: [1, -2, 0, 2, -1, 2, 1, 1, -1, 2, -2],
        rotate: [0, -5, 5, 0, 5, -5, 0, -5, 5, 0, -5],
      }}
      transition={{
        duration: 0.4,
        ease: [0.36, 0.07, 0.19, 0.97],
        repeatType: "reverse",
        repeat: Infinity,
        repeatDelay: 3,
      }}
    />
  );
};
