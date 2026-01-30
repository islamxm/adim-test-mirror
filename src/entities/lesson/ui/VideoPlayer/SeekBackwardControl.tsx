import { Button } from "@mui/material";
import { useMediaPlayer } from "@vidstack/react";
import { motion } from "motion/react";

import { PrevIcon } from "@/shared/ui/icons";

export const SeekBackwardControl = () => {
  const player = useMediaPlayer();

  return (
    <Button
      onClick={() => player?.remoteControl.seek(player.currentTime - 10)}
      sx={{ fontSize: "2.2rem", gap: "1rem" }}
      color={"secondary"}
      // component={motion.button}
      // initial={{ opacity: 0 }}
      // exit={{ opacity: 0 }}
      // animate={{ opacity: 1 }}
    >
      <PrevIcon sx={{ fontSize: "3.8rem" }} /> 10s
    </Button>
  );
};
