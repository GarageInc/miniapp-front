import { SVGAttributes } from "react";

export function CrossIcon(props: SVGAttributes<SVGElement>) {
  return (
    <svg
      fill="none"
      height="12"
      viewBox="0 0 12 12"
      width="12"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        clipRule="evenodd"
        d="m6.0036 4.93934-4.46967-4.469674-1.060663 1.060664 4.469673 4.46967-4.469673 4.4697 1.060663 1.0606 4.46967-4.46964 4.4697 4.46964 1.0606-1.0606-4.46964-4.4697 4.46964-4.46967-1.0606-1.060664z"
        fill="currentColor"
        fillRule="evenodd"
      />
    </svg>
  );
}
