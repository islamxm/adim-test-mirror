import { FC } from "react";
import { motion } from "motion/react";
import { Box, Stack } from "@mui/material";

type Props = {
  percent: number;
};
export const ProgressCircle: FC<Props> = ({ percent }) => {
  const radius = 26;
  const circumference = 2 * Math.PI * radius;
  const fillPercent = percent / 100;

  return (
    <Box sx={{position: "relative", width: "6.4rem", height: "6.4rem"}}>
      <svg width="64" height="64" viewBox="0 0 64 64">
        <circle
          cx="32"
          cy="32"
          r={radius}
          stroke="#76D9B7"
          strokeOpacity="0.15"
          strokeWidth="8"
          fill="none"
        />
        <motion.circle
          cx="32"
          cy="32"
          r={radius}
          stroke="#063B29"
          strokeWidth="8"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={circumference}
          strokeLinecap="round"
          animate={{ strokeDashoffset: circumference * (1 - fillPercent) }}
          transition={{ duration: 2, ease: "easeInOut" }}
          transform="rotate(-90 32 32)"
        />
      </svg>
      <Stack justifyContent={"center"} alignItems={"center"} sx={{position: "absolute", inset: 0, }}>
        {percent}%
      </Stack>
    </Box>
  );
};
