import { PauseIcon } from "@/shared/ui/icons";
import { alpha, IconButton } from "@mui/material";
import { useMediaPlayer } from "@vidstack/react";
import { motion } from "motion/react";

export const PauseBigButton = () => {
  const player = useMediaPlayer();

  return (
    <motion.div
      initial={{ scale: 0 }}
      exit={{ scale: 0 }}
      animate={{ scale: 1 }}
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
    </motion.div>
  );
};
