import { Skeleton, Stack } from "@mui/material";
import { motion } from "motion/react";

export const QuestionResultSkeleton = () => {
  return (
    <Stack
      sx={{
        minHeight: "10.5rem",
        borderRadius: "1.8rem",
        border: "2px solid #ECECEC",
        p: "1.2rem 2rem",
      }}
      gap={"1.6rem"}
      component={motion.div}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <Skeleton variant={"rounded"} height={"2.1rem"} />
      <Stack gap={"1rem"}>
        <Skeleton width={"30%"} variant={"rounded"} height={"2.4rem"} />
        <Skeleton width={"60%"} variant={"rounded"} height={"1.8rem"} />
      </Stack>
    </Stack>
  );
};
