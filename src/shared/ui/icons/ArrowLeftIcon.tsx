import { SvgIcon, SvgIconProps } from "@mui/material";
import { FC } from "react";

export const ArrowLeftIcon: FC<SvgIconProps> = (props) => {
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
          d="M22.6668 15.9998H9.3335M9.3335 15.9998L14.6668 21.3332M9.3335 15.9998L14.6668 10.6665"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </SvgIcon>
  );
};
