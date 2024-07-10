import cx from "classnames";

import friendsIconUrl from "@/assets/illustrations/Friends.png?w=80&h=80&format=webp&imagetools";

export type AvatarProps = {
  pictureUrl?: string | null;
  className?: string;
  size?: "sm" | "md" | "lg";
};

export function Avatar({ pictureUrl, className, size = "md" }: AvatarProps) {
  const sizeCls = {
    sm: "w-6 h-6",
    md: "w-9 h-9",
    lg: "w-12 h-12",
  }[size];

  if (!pictureUrl) {
    return (
      <div
        className={cx(
          "rounded-full justify-center flex items-center bg-black/[.4] p-1.5",
          sizeCls,
          className
        )}
      >
        <img
          src={pictureUrl || friendsIconUrl}
          alt="Avatar"
          className="rounded-full object-cover w-full h-full m-1"
        />
      </div>
    );
  }

  return (
    <img
      src={pictureUrl}
      alt="Avatar"
      className={cx("rounded-full", sizeCls, className)}
    />
  );
}
