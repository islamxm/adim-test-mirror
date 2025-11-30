import { SvgIcon, SvgIconProps } from "@mui/material";
import { FC } from "react";

export const MenuIconRound: FC<SvgIconProps> = (props) => {
  return (
    <SvgIcon {...props}>
      <svg
        width="28"
        height="28"
        viewBox="0 0 28 28"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          x="0.75"
          y="0.75"
          width="26.5"
          height="26.5"
          rx="13.25"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <path
          d="M10.3335 17.3332H15.6668M10.3335 13.9998H19.6668M10.3335 10.6665H15.6668"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </SvgIcon>
  );
};
