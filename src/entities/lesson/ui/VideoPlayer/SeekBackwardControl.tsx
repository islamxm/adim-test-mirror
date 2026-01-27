import { Button } from "@mui/material";
import { useMediaPlayer } from "@vidstack/react";

import { PrevIcon } from "@/shared/ui/icons";

export const SeekBackwardControl = () => {
  const player = useMediaPlayer();

  return (
    <Button
      onClick={() => player?.remoteControl.seek(player.currentTime - 10)}
      sx={{ fontSize: "2.2rem", gap: "1rem" }}
      color={"secondary"}
    >
      <PrevIcon sx={{ fontSize: "3.8rem" }} /> 10s
    </Button>
  );
};
