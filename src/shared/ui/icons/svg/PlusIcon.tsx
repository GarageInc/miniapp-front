import { SVGAttributes } from "react";

export const PlusIcon = (props: SVGAttributes<SVGElement>) => {
  return (
    <svg
      width="25"
      height="24"
      viewBox="0 0 25 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.5 13V20H13.5V13H20.5V11H13.5V4H11.5V11H4.5V13H11.5Z"
        fill="currentColor"
      />
    </svg>
  );
};
