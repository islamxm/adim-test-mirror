"use client";
import { Box } from "@mui/material";
import { motion } from "motion/react";

import { Game } from "../Game/Game";

export const GamePage = () => {
  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      sx={{ pt: "13rem", height: "100%" }}
    >
      <Game />
    </Box>
  );
};
