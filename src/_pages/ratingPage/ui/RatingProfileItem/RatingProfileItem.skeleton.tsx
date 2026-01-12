import { Paper, Skeleton, Stack } from "@mui/material";
import { motion } from "motion/react";

export const RatingProfileItemSkeleton = () => {
  return (
    <Paper
      sx={{
        p: "1.6rem",
        borderRadius: "2.5rem",
        width: "100%",
        height: "9.6rem",
        overflow: "hidden",
      }}
      elevation={1}
      component={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <Stack gap={"1.6rem"} alignItems={"center"} direction={"row"}>
        <Skeleton variant={"text"} width={"4.8rem"} />
        <Stack gap={"2rem"} direction={"row"} sx={{ flexGrow: 1 }}>
          <Skeleton variant={"circular"} height={"6.4rem"} width={"6.4rem"} />
          <Skeleton variant={"text"} width={"50%"} />
        </Stack>
        <Skeleton variant={"rounded"} width={"5rem"} height={"4rem"} />
      </Stack>
    </Paper>
  );
};
