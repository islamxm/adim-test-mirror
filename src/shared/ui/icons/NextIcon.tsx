import { FC } from "react";

import { SvgIcon, SvgIconProps } from "@mui/material";

export const NextIcon: FC<SvgIconProps> = (props) => {
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
          d="M19 19.0002V11.0835L33.25 19.0002L19 26.9168V19.0002L4.75 26.9168V11.0835L19 19.0002Z"
          fill="currentColor"
        />
        <path
          d="M19 19.0002V11.0835L33.25 19.0002L19 26.9168V19.0002ZM19 19.0002L4.75 26.9168V11.0835L19 19.0002Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </SvgIcon>
  );
};
