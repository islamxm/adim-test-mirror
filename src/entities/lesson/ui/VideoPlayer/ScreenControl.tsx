import { IconButton } from "@mui/material";
import { useMediaPlayer } from "@vidstack/react";

import { FullScreenIcon } from "@/shared/ui/icons";

export const ScreenControl = () => {
  const player = useMediaPlayer();

  const toggleFullscreen = () => {
    if (!player) return;
    if (player.state.fullscreen) {
      player.remoteControl.exitFullscreen();
    } else {
      player.remoteControl.enterFullscreen();
    }
  };

  return (
    <IconButton onClick={toggleFullscreen} sx={{ color: "#fff" }}>
      <FullScreenIcon sx={{ fontSize: "2.4rem" }} />
    </IconButton>
  );
};
