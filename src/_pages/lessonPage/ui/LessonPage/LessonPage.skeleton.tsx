import { Skeleton, Stack } from "@mui/material";
import { motion } from "motion/react";

export const LessonPageSkeleton = () => {
  return (
    <Stack
      component={motion.div}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      gap={"2.4rem"}
    >
      <Skeleton variant={"text"} height={"4.8rem"} />
      <Skeleton sx={{ aspectRatio: "16/9" }} variant={"rounded"} height={"auto"} />
      <Stack gap={".5rem"}>
        <Skeleton variant={"text"} height={"2rem"} />
        <Skeleton variant={"text"} height={"2rem"} />
        <Skeleton variant={"text"} height={"2rem"} />
        <Skeleton variant={"text"} height={"2rem"} />
      </Stack>
    </Stack>
  );
};
