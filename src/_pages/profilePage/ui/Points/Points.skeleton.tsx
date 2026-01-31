import { Skeleton, Stack } from "@mui/material";
import { motion } from "motion/react";

import { defaultComponentAnimation } from "@/shared/config";

export const PointsSkeleton = () => {
  return (
    <Stack
      component={motion.div}
      {...defaultComponentAnimation}
      sx={{ p: "2.4rem 3.2rem" }}
      gap={"2.6rem"}
      direction={"row"}
    >
      <Skeleton variant={"circular"} width={"5.4rem"} height={"5.4rem"} />
      <Stack gap={".8rem"} sx={{ flexGrow: 1 }}>
        <Skeleton variant={"rounded"} width={"60%"} height={"2.4rem"} />
        <Skeleton variant={"rounded"} width={"40%"} height={"3.6rem"} />
      </Stack>
    </Stack>
  );
};
