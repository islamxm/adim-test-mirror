import { FC } from "react";

import { SvgIcon, SvgIconProps } from "@mui/material";

export const NoLeagueIcon: FC<SvgIconProps> = (props) => {
  return (
    <SvgIcon {...props}>
      <svg
        width="48"
        height="48"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M20.4378 8.32456C21.7788 5.1908 26.2212 5.1908 27.5622 8.32456C28.3902 10.2596 30.6116 11.1797 32.5654 10.3969C35.7295 9.12926 38.8707 12.2705 37.6031 15.4346C36.8203 17.3884 37.7404 19.6098 39.6754 20.4378C42.8092 21.7788 42.8092 26.2212 39.6754 27.5622C37.7404 28.3902 36.8203 30.6116 37.6031 32.5654C38.8707 35.7295 35.7295 38.8707 32.5654 37.6031C30.6116 36.8203 28.3902 37.7404 27.5622 39.6754C26.2212 42.8092 21.7788 42.8092 20.4378 39.6754C19.6098 37.7404 17.3884 36.8203 15.4346 37.6031C12.2705 38.8707 9.12926 35.7295 10.3969 32.5654C11.1797 30.6116 10.2596 28.3902 8.32456 27.5622C5.1908 26.2212 5.1908 21.7788 8.32456 20.4378C10.2596 19.6098 11.1797 17.3884 10.3969 15.4346C9.12926 12.2705 12.2705 9.12926 15.4346 10.3969C17.3884 11.1797 19.6098 10.2596 20.4378 8.32456Z"
          fill="#E8E8E8"
        />
        <g filter="url(#filter0_i_12705_1130)">
          <circle cx="24" cy="24" r="12" fill="#D9D9D9" />
        </g>
        <defs>
          <filter
            id="filter0_i_12705_1130"
            x="12"
            y="12"
            width="24"
            height="24"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset />
            <feGaussianBlur stdDeviation="2" />
            <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0.653846 0 0 0 0 0.653846 0 0 0 0 0.653846 0 0 0 0.25 0"
            />
            <feBlend mode="normal" in2="shape" result="effect1_innerShadow_12705_1130" />
          </filter>
        </defs>
      </svg>
    </SvgIcon>
  );
};
