"use client";
import { FC } from "react";

import { Box } from "@mui/material";

import { HTMLContent } from "@/shared/ui";

import { Course } from "@/entities/course";

type Props = Pick<Course, "explanation">;

export const RestInfo: FC<Props> = ({ explanation }) => {
  return (
    <Box sx={{ width: "100%", p: "4rem 1rem 0 0" }}>
      <HTMLContent value={explanation} />
    </Box>
  );
};
