import { Typography, Box, alpha } from "@mui/material";
import { motion } from "motion/react";

export const LoseText = () => {
  return (
    <Box
      initial={{ y: "100%", opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        ease: "easeInOut",
        duration: 0.5,
      }}
      component={motion.div}
      sx={(theme) => ({
        p: "2rem 4rem",
        borderRadius: "3rem",
        backgroundColor: alpha(theme.palette.error.main, 0.3),
        boxShadow: `0 0 20px 10px ${alpha(theme.palette.error.main, 0.2)}`,
        // border: `1px solid ${theme.palette.error.main}`
      })}
    >
      <Typography
        textAlign={"center"}
        variant="h2"
        sx={(theme) => ({ color: theme.palette.error.main, fontWeight: 700 })}
      >
        YOU LOOSE!
      </Typography>
    </Box>
  );
};
