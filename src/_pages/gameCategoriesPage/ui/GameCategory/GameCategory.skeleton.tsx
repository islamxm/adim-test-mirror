import { Paper, Skeleton, Stack } from "@mui/material";
import { motion } from "motion/react";

export const GameCategorySkeleton = () => {
  return (
    <Paper
      elevation={0}
      sx={{
        height: "25rem",
        borderRadius: "3.4rem",
        p: "3.4rem",
        flexGrow: 1,
        display: "block",
      }}
      component={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Stack gap={"4rem"}>
        <Skeleton
          variant={"rounded"}
          width={"8.6rem"}
          height={"8.6rem"}
          sx={{ borderRadius: "1.4rem" }}
        />
        <Skeleton variant={"rounded"} height={"3.1rem"} />
      </Stack>
    </Paper>
  );
};
