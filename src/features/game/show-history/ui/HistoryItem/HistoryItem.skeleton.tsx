import { Box, Paper, Skeleton, Stack } from "@mui/material";
import { motion } from "motion/react";

export const HistoryItemSkeleton = () => {
  return (
    <Paper
      component={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      sx={{ width: "100%", height: "25.4rem", borderRadius: "3.4rem" }}
    >
      <Stack sx={{ height: "100%" }} alignItems={"center"} direction={"row"} gap={"1rem"}>
        <Box sx={{ flex: 1 }}>
          <Stack alignItems={"center"} justifyContent={"center"} gap={"1rem"}>
            <Skeleton width={"12.4rem"} height={"12.4rem"} variant={"circular"} />
            <Skeleton width={"50%"} variant={"text"} />
            <Skeleton width={"30%"} variant={"text"} />
          </Stack>
        </Box>
        <Box sx={{ flex: "0 0 auto", width: "9.6rem" }}>
          <Skeleton variant={"rounded"} height={"6rem"} />
        </Box>
        <Box sx={{ flex: 1 }}>
          <Stack alignItems={"center"} justifyContent={"center"} gap={"1rem"}>
            <Skeleton width={"12.4rem"} height={"12.4rem"} variant={"circular"} />
            <Skeleton width={"50%"} variant={"text"} />
            <Skeleton width={"30%"} variant={"text"} />
          </Stack>
        </Box>
      </Stack>
    </Paper>
  );
};
