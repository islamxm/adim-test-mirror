import { IconButton, alpha } from "@mui/material";
import { CircularProgress } from "@mui/material";
import { useMediaPlayer } from "@vidstack/react";
import { motion } from "motion/react";

export const WaitingBigButton = () => {
  const player = useMediaPlayer();

  return (
    <motion.div
    // initial={{ opacity: 0 }} exit={{ opacity: 0 }} animate={{ opacity: 1 }}
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
        onClick={() => player?.play()}
      >
        <CircularProgress sx={(theme) => ({ color: theme.palette.common.white })} />
      </IconButton>
    </motion.div>
  );
};
