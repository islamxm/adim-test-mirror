"use client";
import { FC } from "react";

import { Box, alpha } from "@mui/material";

import { ProgressCircle } from "@/shared/ui";

export const ProgressBadge: FC<{ value?: number }> = ({ value }) => {
  return (
    <Box>
      <ProgressCircle percent={value || 0} />
    </Box>
  );
};
