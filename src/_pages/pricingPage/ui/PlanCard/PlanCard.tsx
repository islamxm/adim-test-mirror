import { FC, PropsWithChildren } from "react";

import { Paper, Stack } from "@mui/material";
import { motion } from "motion/react";

export const PlanCard: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Paper
      component={motion.div}
      sx={{
        minHeight: "37.3rem",
        width: "25.4rem",
        borderRadius: "2rem",
        overflow: "hidden",
        display: "flex",
      }}
      // whileHover={{ y: "-1rem" }}
      variants={{
        rest: { y: 0 },
        hovered: { y: "-1rem" },
      }}
      initial="rest"
      whileHover="hovered"
    >
      <Stack
        gap={"2.4rem"}
        alignItems={"center"}
        sx={{ padding: "4.2rem 2.4rem 2.4rem", position: "relative" }}
      >
        {children}
      </Stack>
    </Paper>
  );
};
