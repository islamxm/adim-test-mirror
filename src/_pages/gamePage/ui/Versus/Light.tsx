import { Box } from "@mui/material";
import { motion } from "motion/react";

export const Light = () => {
  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: [0, 1, 0], scale: [0, 2, 2] }}
      transition={{
        times: [0, 0.5, 1],
        duration: 1.5,
      }}
      sx={{
        position: "absolute",
        inset: -100,
        borderRadius: "50%",
        background:
          "radial-gradient(circle,rgba(255, 255, 0, 0.76) 0%, rgba(255, 251, 0, 0.18) 38%, rgba(255, 255, 255, 0) 86%)",
      }}
    />
  );
};
