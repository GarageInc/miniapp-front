import { AnchorHTMLAttributes, FC, ReactNode } from "react";
import { Link } from "react-router-dom";
import { Trans } from "@lingui/macro";

import { GameEvents } from "@/shared/analytics/GameEvents";
import { useUser } from "@/shared/api";
import { ROUTES } from "@/shared/routing";
import { Button } from "@/shared/ui/forms";
import { IconVariant, IllustrationIcon } from "@/shared/ui/icons";
import { StatusBar } from "@/shared/ui/navigation/StatusBar";

type Props = {
  className?: string;
};

export const UserStatusBar: FC<Props> = ({ className }) => {
  const { data: user } = useUser();

  return (
    <StatusBar
      className={className}
      user={{
        name: user?.username ?? "",
        level: user?.level || 0,
        pictureUrl: user?.photoUrl,
      }}
      inventory={{
        current: user?.currentElementsCount ?? user?.inventory.length ?? 0,
        // total: user?.maxInventorySize ?? 0,
      }}
      additionalButtons={
        <>
          <NavChip
            href={ROUTES.leaderboards}
            icon="leaderboard"
            onClick={GameEvents.clickLadder}
          >
            <Trans>Ladder</Trans>
          </NavChip>
          <NavChip
            href={ROUTES.wallet}
            icon="wallet"
            onClick={GameEvents.clickMarket}
          >
            <Trans>Market</Trans>
          </NavChip>
        </>
      }
    />
  );
};

function NavChip({
  icon,
  href,
  children,
  ...props
}: {
  icon: IconVariant;
  href: string;
  children: ReactNode;
} & AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <Link to={href} {...props}>
      <Button
        size="sm"
        color="gray"
        iconLeft={<IllustrationIcon variant={icon} />}
        className="px-1"
      >
        <span>{children}</span>
      </Button>
    </Link>
  );
}
