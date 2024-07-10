import { SVGAttributes } from "react";

export function CheckboxIcon(props: SVGAttributes<SVGElement>) {
  return (
    <svg
      width="29"
      height="28"
      viewBox="0 0 29 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g filter="url(#filter0_d_22_8383)">
        <rect
          x="2.5"
          y="1"
          width="24"
          height="24"
          rx="7"
          fill="#1A8F1E"
          shapeRendering="crispEdges"
        />
        <rect
          x="3"
          y="1.5"
          width="23"
          height="23"
          rx="6.5"
          stroke="white"
          strokeOpacity="0.3"
          shapeRendering="crispEdges"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M19.6507 8.74076C19.2314 8.38134 18.6001 8.4299 18.2407 8.84923L12.9435 15.0293L10.707 12.7929C10.3165 12.4024 9.68336 12.4024 9.29283 12.7929C8.90231 13.1834 8.90231 13.8166 9.29283 14.2071L12.2928 17.2071C12.4898 17.4041 12.76 17.51 13.0383 17.4993C13.3167 17.4886 13.5779 17.3623 13.7592 17.1508L19.7592 10.1508C20.1186 9.73148 20.0701 9.10018 19.6507 8.74076Z"
          fill="white"
        />
      </g>
      <defs>
        <filter
          id="filter0_d_22_8383"
          x="0.5"
          y="0"
          width="28"
          height="28"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="1" />
          <feGaussianBlur stdDeviation="1" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_22_8383"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_22_8383"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
}
