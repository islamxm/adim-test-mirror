import { Box, Skeleton, Stack } from "@mui/material";
import { motion } from "motion/react";

import { defaultComponentAnimation } from "@/shared/config";

export const ProfileHeaderSkeleton = () => {
  return (
    <Box
      component={motion.div}
      {...defaultComponentAnimation}
      sx={{ maxWidth: "82rem", width: "100%", margin: "0 auto", p: "8.4rem 1rem" }}
    >
      <Stack gap={"1rem"} direction={"row"} alignItems={"center"} justifyContent={"space-between"}>
        <Stack sx={{ width: "100%" }} alignItems={"center"} gap={"2.4rem"} direction={"row"}>
          <Skeleton width={"12.4rem"} height={"12.4rem"} variant={"circular"} />
          <Stack sx={{ flexGrow: 1 }} gap={".4rem"}>
            <Skeleton width={"60%"} height={"3.6rem"} variant={"rounded"} />
            <Skeleton width={"40%"} height={"2.7rem"} variant={"rounded"} />
            <Skeleton width={"50%"} height={"2.7rem"} variant={"rounded"} />
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
};
