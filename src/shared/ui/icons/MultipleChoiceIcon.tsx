import { FC } from "react";

import { SvgIcon, SvgIconProps } from "@mui/material";

export const MultipleChoiceIcon: FC<SvgIconProps> = (props) => {
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
          d="M14.6673 22.6667H26.6673M10.6673 20.0001L7.33398 24.0001L5.33398 22.6667M14.6673 16.0001H26.6673M10.6673 13.3334L7.33398 17.3334L5.33398 16.0001M14.6673 9.33341H26.6673M10.6673 6.66675L7.33398 10.6667L5.33398 9.33341"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </SvgIcon>
  );
};
