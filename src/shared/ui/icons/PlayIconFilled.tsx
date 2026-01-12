import { FC } from "react";

import { SvgIcon, SvgIconProps } from "@mui/material";

export const PlayIconFilled: FC<SvgIconProps> = (props) => {
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
          d="M7.91699 27.4449V10.5561C7.91699 9.16341 7.91699 8.46631 8.21005 8.05427C8.46584 7.69464 8.86008 7.45852 9.29777 7.40207C9.79907 7.33741 10.4139 7.66532 11.6418 8.32022L27.4752 16.7647L27.4809 16.7672C28.8379 17.491 29.5168 17.853 29.7394 18.3355C29.9337 18.7565 29.9337 19.2424 29.7394 19.6633C29.5164 20.1465 28.836 20.51 27.4752 21.2358L11.6418 29.6803C10.413 30.3356 9.79925 30.6623 9.29777 30.5976C8.86008 30.5412 8.46584 30.3051 8.21005 29.9455C7.91699 29.5334 7.91699 28.8376 7.91699 27.4449Z"
          fill="currentColor"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </SvgIcon>
  );
};
