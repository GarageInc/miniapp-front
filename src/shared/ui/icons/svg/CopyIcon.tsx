import { SVGAttributes } from "react";

export function CopyIcon(props: SVGAttributes<SVGElement>) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect
        x="5"
        y="3"
        width="10"
        height="14"
        rx="2"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8 18V19C8 20.6569 9.34315 22 11 22H17C18.6569 22 20 20.6569 20 19V9C20 7.34315 18.6569 6 17 6H16V8H17C17.5523 8 18 8.44772 18 9V19C18 19.5523 17.5523 20 17 20H11C10.4477 20 10 19.5523 10 19V18H8Z"
        fill="currentColor"
      />
    </svg>
  );
}
