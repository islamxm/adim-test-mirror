import { Box } from "@mui/material";
import { motion } from "motion/react";

export const BgRed = () => {
  return (
    <Box
      sx={{
        position: "fixed",
        height: "100%",
        width: "100%",
        top: 0,
        right: 0,
        background: "radial-gradient(circle,rgba(223, 2, 2, 1) 40%, rgba(223, 2, 2, 0) 80%)",
      }}
      component={motion.div}
      initial={{ x: "100%", opacity: 0, scaleY: 1.5 }}
      exit={{ x: "100%", opacity: 0, scaleY: 1.5 }}
      animate={{ x: "45%", opacity: 1, scaleY: 1.5 }}
      transition={{
        ease: "circInOut",
        duration: 1,
      }}
    ></Box>
  );
};
