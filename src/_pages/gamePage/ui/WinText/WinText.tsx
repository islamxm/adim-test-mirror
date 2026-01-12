import { Box, Typography, alpha } from "@mui/material";
import { motion } from "motion/react";

export const WinText = () => {
  return (
    <Box
      component={motion.div}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      sx={(theme) => ({
        p: "2rem 4rem",
        borderRadius: "3rem",
        backgroundColor: alpha(theme.palette.success.main, 0.3),
        boxShadow: `0 0 20px 10px ${alpha(theme.palette.success.main, 0.2)}`,
        // border: `1px solid ${theme.palette.success.main}`
      })}
    >
      <Typography
        textAlign={"center"}
        variant="h2"
        sx={(theme) => ({ color: theme.palette.success.main, fontWeight: 700 })}
      >
        YOU WIN!
      </Typography>
    </Box>
  );
};
