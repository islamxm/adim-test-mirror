import { FC } from "react";

import { SvgIcon, SvgIconProps } from "@mui/material";

export const PrevIcon: FC<SvgIconProps> = (props) => {
  return (
    <SvgIcon {...props}>
      <svg
        width="38"
        height="38"
        viewBox="0 0 38 38"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M19 18.9998V26.9165L4.75 18.9998L19 11.0832V18.9998L33.25 11.0832V26.9165L19 18.9998Z"
          fill="currentColor"
        />
        <path
          d="M19 18.9998V26.9165L4.75 18.9998L19 11.0832V18.9998ZM19 18.9998L33.25 11.0832V26.9165L19 18.9998Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </SvgIcon>
  );
};
