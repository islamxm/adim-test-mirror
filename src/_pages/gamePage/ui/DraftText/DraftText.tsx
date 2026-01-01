import { Typography, Box, alpha } from "@mui/material";
import { motion } from "motion/react";

export const DraftText = () => {
  return (
    <Box
      component={motion.div}
      initial={{ y: "100%", opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        ease: "easeInOut",
        duration: 0.5,
      }}
      sx={(theme) => ({
        p: "2rem 4rem",
        borderRadius: "3rem",
        backgroundColor: alpha(theme.palette.grey[500], 0.3),
        boxShadow: `0 0 20px 10px ${alpha(theme.palette.grey[500], 0.2)}`,
        // border: `1px solid ${theme.palette.grey[500]}`
      })}
    >
      <Typography
        textAlign={"center"}
        variant="h2"
        sx={(theme) => ({ color: theme.palette.grey[500], fontWeight: 700 })}
      >
        DRAFT
      </Typography>
    </Box>
  );
};
