import { FC } from "react";

import { SvgIcon, SvgIconProps } from "@mui/material";

export const CheckIcon: FC<SvgIconProps> = (props) => {
  return (
    <SvgIcon {...props}>
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M8 15.9999L13.6569 21.6568L24.9694 10.343"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </SvgIcon>
  );
};
