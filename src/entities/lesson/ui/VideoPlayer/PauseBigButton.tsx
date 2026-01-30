import { Box, IconButton, alpha } from "@mui/material";
import { useMediaPlayer } from "@vidstack/react";
import { motion } from "motion/react";

import { PauseIcon } from "@/shared/ui/icons";

export const PauseBigButton = () => {
  const player = useMediaPlayer();

  return (
    <Box
    // component={motion.div} initial={{ opacity: 0 }} exit={{ opacity: 0 }} animate={{ opacity: 1 }}
    >
      <IconButton
        sx={{
          width: "7.2rem",
          height: "7.2rem",
          backgroundColor: alpha("#000", 0.4),
          backdropFilter: "blur(10px)",
          "&:hover": {
            backgroundColor: alpha("#000", 0.4),
            backdropFilter: "blur(10px)",
          },
        }}
        onClick={() => player?.pause()}
      >
        <PauseIcon sx={{ fontSize: "2.8rem", color: "#fff" }} />
      </IconButton>
    </Box>
  );
};
