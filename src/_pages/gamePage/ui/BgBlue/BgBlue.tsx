import { FC } from "react";

import { Box } from "@mui/material";
import { motion } from "motion/react";

type Props = { isDoubleBg: boolean };

export const BgBlue: FC<Props> = ({ isDoubleBg }) => {
  return (
    <Box
      sx={{
        position: "fixed",
        height: "100%",
        width: "100%",
        top: 0,
        left: 0,
        "& svg": {
          width: "100%",
          height: "100%",
        },
      }}
      component={motion.div}
      initial={{ x: "0", opacity: 0, scale: 2 }}
      exit={{ x: "0", opacity: 0, scale: 2 }}
      transition={{
        ease: "circInOut",
        duration: 1,
      }}
      variants={{
        double: {
          x: "-50%",
          opacity: 1,
          scale: 2,
        },
        single: {
          x: "0",
          opacity: 1,
          scale: 2,
        },
      }}
      animate={isDoubleBg ? "double" : "single"}
    >
      <svg
        width="1973"
        height="2757"
        viewBox="0 0 1973 2757"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g filter="url(#filter0_f_12597_1075)">
          <ellipse cx="986.5" cy="1378.5" rx="486.5" ry="878.5" fill="#0278FF" />
        </g>
        <defs>
          <filter
            id="filter0_f_12597_1075"
            x="0"
            y="0"
            width="1973"
            height="2757"
            filterUnits="userSpaceOnUse"
            color-interpolation-filters="sRGB"
          >
            <feFlood flood-opacity="0" result="BackgroundImageFix" />
            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
            <feGaussianBlur stdDeviation="250" result="effect1_foregroundBlur_12597_1075" />
          </filter>
        </defs>
      </svg>
    </Box>
  );
};
