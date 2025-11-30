import { SvgIcon, SvgIconProps } from "@mui/material";
import { FC } from "react";

export const PlayIconRound: FC<SvgIconProps> = (props) => {
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
          d="M10.3335 17.5558V10.4447C10.3335 9.85828 10.3335 9.56476 10.4569 9.39127C10.5646 9.23985 10.7306 9.14043 10.9149 9.11666C11.126 9.08944 11.3848 9.2275 11.9019 9.50325L18.5685 13.0588L18.5709 13.0599C19.1423 13.3646 19.4281 13.517 19.5219 13.7202C19.6037 13.8975 19.6037 14.1021 19.5219 14.2793C19.428 14.4828 19.1415 14.6358 18.5685 14.9414L11.9019 18.497C11.3845 18.7729 11.126 18.9104 10.9149 18.8832C10.7306 18.8594 10.5646 18.76 10.4569 18.6086C10.3335 18.4351 10.3335 18.1421 10.3335 17.5558Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </SvgIcon>
  );
};
