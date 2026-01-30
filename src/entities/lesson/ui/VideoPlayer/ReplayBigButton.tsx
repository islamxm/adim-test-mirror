import { IconButton, alpha } from "@mui/material";
import { useMediaPlayer } from "@vidstack/react";
import { motion } from "motion/react";

import { PlayIconFilled, RetryIcon } from "@/shared/ui/icons";

export const ReplayBigButton = () => {
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
        onClick={() => {
          player?.remoteControl.seek(0);
          player?.play();
        }}
      >
        <RetryIcon sx={{ fontSize: "3.8rem", color: "#fff" }} />
      </IconButton>
    </motion.div>
  );
};
