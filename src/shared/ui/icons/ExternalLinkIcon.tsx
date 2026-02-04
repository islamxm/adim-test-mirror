import { FC } from "react";

import { SvgIcon, SvgIconProps } from "@mui/material";

export const ExternalLinkIcon: FC<SvgIconProps> = (props) => {
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
          d="M13.3329 6.66659H10.9329C9.43947 6.66659 8.69218 6.66659 8.12174 6.95723C7.61998 7.2129 7.21233 7.62055 6.95666 8.12231C6.66602 8.69275 6.66602 9.44004 6.66602 10.9335V21.0668C6.66602 22.5603 6.66602 23.3067 6.95666 23.8771C7.21233 24.3789 7.61998 24.7872 8.12174 25.0429C8.69162 25.3333 9.43801 25.3333 10.9286 25.3333H21.0701C22.5607 25.3333 23.306 25.3333 23.8759 25.0429C24.3776 24.7872 24.7867 24.3785 25.0423 23.8767C25.3327 23.3068 25.3327 22.5613 25.3327 21.0707V18.6666M26.666 11.9999V5.33325M26.666 5.33325H19.9993M26.666 5.33325L17.3327 14.6666"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </SvgIcon>
  );
};
