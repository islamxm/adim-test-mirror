import { SvgIcon, SvgIconProps } from "@mui/material";
import { FC } from "react";

export const ChevronRightDuo: FC<SvgIconProps> = (props) => {
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
          d="M26 16L34 24L26 32M14 16L22 24L14 32"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </SvgIcon>
  );
};
