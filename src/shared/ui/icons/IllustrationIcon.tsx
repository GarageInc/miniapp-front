import cx from "classnames";
import { FC, HTMLAttributes } from "react";

// smaller sizes (up to 64x64 on @2x)
import clockUrl from "@/assets/illustrations/Clock.png?w=128&h=128&format=webp&imagetools";
// large sizes (up to 128x128 on @2x)
import clockUrlLarge from "@/assets/illustrations/Clock.png?w=256&h=256&format=webp&imagetools";
import craftUrl from "@/assets/illustrations/Craft.png?w=128&h=128&format=webp&imagetools";
import craftUrlLarge from "@/assets/illustrations/Craft.png?w=256&h=256&format=webp&imagetools";
import elementsUrl from "@/assets/illustrations/Elements.png?w=128&h=128&format=webp&imagetools";
import elementsUrlLarge from "@/assets/illustrations/Elements.png?w=256&h=256&format=webp&imagetools";
import errorImg from "@/assets/illustrations/Error.png?w=128&h=128&format=webp&imagetools";
import errorImgLarge from "@/assets/illustrations/Error.png?w=256&h=256&format=webp&imagetools";
import socialImg from "@/assets/illustrations/Friends.png?w=128&h=128&format=webp&imagetools";
import noNetworkImg from "@/assets/illustrations/Friends.png?w=128&h=128&format=webp&imagetools";
import friendsUrl from "@/assets/illustrations/Friends.png?w=128&h=128&format=webp&imagetools";
import socialImgLarge from "@/assets/illustrations/Friends.png?w=256&h=256&format=webp&imagetools";
import noNetworkImgLarge from "@/assets/illustrations/Friends.png?w=256&h=256&format=webp&imagetools";
import friendsUrlLarge from "@/assets/illustrations/Friends.png?w=256&h=256&format=webp&imagetools";
import gemUrl from "@/assets/illustrations/Gem.png?w=128&h=128&format=webp&imagetools";
import gemUrlLarge from "@/assets/illustrations/Gem.png?w=256&h=256&format=webp&imagetools";
import lootboxImg from "@/assets/illustrations/Gift_unlock.png?w=128&h=128&format=webp&imagetools";
import lootboxOpenedUrl from "@/assets/illustrations/Gift_unlock.png?w=128&h=128&format=webp&imagetools";
import lootboxImgLarge from "@/assets/illustrations/Gift_unlock.png?w=256&h=256&format=webp&imagetools";
import lootboxOpenedUrlLarge from "@/assets/illustrations/Gift_unlock.png?w=256&h=256&format=webp&imagetools";
import inventoryUrl from "@/assets/illustrations/Inventory.png?w=128&h=128&format=webp&imagetools";
import inventoryUrlLarge from "@/assets/illustrations/Inventory.png?w=256&h=256&format=webp&imagetools";
import leaderboardUrl from "@/assets/illustrations/Leaderboards.png?w=128&h=128&format=webp&imagetools";
import leaderboardUrlLarge from "@/assets/illustrations/Leaderboards.png?w=256&h=256&format=webp&imagetools";
import levelUpImg from "@/assets/illustrations/Level up.png?w=128&h=128&format=webp&imagetools";
import levelUpImgLarge from "@/assets/illustrations/Level up.png?w=256&h=256&format=webp&imagetools";
import lockUrl from "@/assets/illustrations/Lock.png?w=128&h=128&format=webp&imagetools";
import lockUrlLarge from "@/assets/illustrations/Lock.png?w=256&h=256&format=webp&imagetools";
import successImg from "@/assets/illustrations/Success.png?w=128&h=128&format=webp&imagetools";
import successImgLarge from "@/assets/illustrations/Success.png?w=256&h=256&format=webp&imagetools";
import tonImg from "@/assets/illustrations/Ton.png?w=128&h=128&format=webp&imagetools";
import tonImgLarge from "@/assets/illustrations/Ton.png?w=256&h=256&format=webp&imagetools";
import top1Url from "@/assets/illustrations/Top1.png?w=128&h=128&format=webp&imagetools";
import top1UrlLarge from "@/assets/illustrations/Top1.png?w=256&h=256&format=webp&imagetools";
import top2Url from "@/assets/illustrations/Top2.png?w=128&h=128&format=webp&imagetools";
import top2UrlLarge from "@/assets/illustrations/Top2.png?w=256&h=256&format=webp&imagetools";
import top3Url from "@/assets/illustrations/Top3.png?w=128&h=128&format=webp&imagetools";
import top3UrlLarge from "@/assets/illustrations/Top3.png?w=256&h=256&format=webp&imagetools";
import top4Url from "@/assets/illustrations/Top4.png?w=128&h=128&format=webp&imagetools";
import top4UrlLarge from "@/assets/illustrations/Top4.png?w=256&h=256&format=webp&imagetools";
import topFriendsUrl from "@/assets/illustrations/TopFriends.png?w=128&h=128&format=webp&imagetools";
import topFriendsUrlLarge from "@/assets/illustrations/TopFriends.png?w=256&h=256&format=webp&imagetools";
import topStarUrl from "@/assets/illustrations/TopStar.png?w=128&h=128&format=webp&imagetools";
import topStarUrlLarge from "@/assets/illustrations/TopStar.png?w=256&h=256&format=webp&imagetools";
import walletUrl from "@/assets/illustrations/Wallet.png?w=128&h=128&format=webp&imagetools";
import walletUrlLarge from "@/assets/illustrations/Wallet.png?w=256&h=256&format=webp&imagetools";

export type IconVariant =
  | "success"
  | "error"
  | "level_up"
  | "social"
  | "no_network"
  | "lootbox"
  | "lootbox_opened"
  | "ton"
  | "inventory"
  | "craft"
  | "friends"
  | "wallet"
  | "elements"
  | "clock"
  | "lock"
  | "leaderboard"
  | "top1"
  | "top2"
  | "top3"
  | "top4"
  | "topFriends"
  | "topStar"
  | "gem";

export const IllustrationIcon: FC<
  { variant: IconVariant; larger?: boolean } & HTMLAttributes<HTMLImageElement>
> = ({ variant, className, larger, ...props }) => {
  const img = {
    success: larger ? successImgLarge : successImg,
    error: larger ? errorImgLarge : errorImg,
    level_up: larger ? levelUpImgLarge : levelUpImg,
    social: larger ? socialImgLarge : socialImg,
    no_network: larger ? noNetworkImgLarge : noNetworkImg,
    lootbox: larger ? lootboxImgLarge : lootboxImg,
    lootbox_opened: larger ? lootboxOpenedUrlLarge : lootboxOpenedUrl,
    ton: larger ? tonImgLarge : tonImg,
    inventory: larger ? inventoryUrlLarge : inventoryUrl,
    craft: larger ? craftUrlLarge : craftUrl,
    friends: larger ? friendsUrlLarge : friendsUrl,
    wallet: larger ? walletUrlLarge : walletUrl,
    elements: larger ? elementsUrlLarge : elementsUrl,
    clock: larger ? clockUrlLarge : clockUrl,
    lock: larger ? lockUrlLarge : lockUrl,
    leaderboard: larger ? leaderboardUrlLarge : leaderboardUrl,
    top1: larger ? top1UrlLarge : top1Url,
    top2: larger ? top2UrlLarge : top2Url,
    top3: larger ? top3UrlLarge : top3Url,
    top4: larger ? top4UrlLarge : top4Url,
    topFriends: larger ? topFriendsUrlLarge : topFriendsUrl,
    topStar: larger ? topStarUrlLarge : topStarUrl,
    gem: larger ? gemUrlLarge : gemUrl,
  }[variant];

  return (
    <img
      src={img}
      alt={variant}
      className={cx("aspect-square", className)}
      {...props}
    />
  );
};
