import { Box, Stack } from "@mui/material";
import { motion } from "motion/react";

import { RatingTopProfileSkeleton } from "../RatingTopProfile/RatingTopProfile.skeleton";

export const RatingTopThreeSkeleton = () => {
  return (
    <Stack
      direction={"row"}
      justifyContent={"center"}
      alignItems={"flex-start"}
      gap={"17rem"}
      component={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <Box sx={{ minWidth: 0, flex: 1 }}>
        <RatingTopProfileSkeleton />
      </Box>
      <Box sx={{ minWidth: 0, flex: 1 }}>
        <RatingTopProfileSkeleton isFirst />
      </Box>
      <Box sx={{ minWidth: 0, flex: 1 }}>
        <RatingTopProfileSkeleton />
      </Box>
    </Stack>
  );
};
