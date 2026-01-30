import { Box, IconButton, alpha } from "@mui/material";
import { useMediaPlayer } from "@vidstack/react";

import { PlayIconFilled } from "@/shared/ui/icons";

export const PlayBigButton = () => {
  const player = useMediaPlayer();

  return (
    <Box
      sx={{
        position: "absolute",
        left: "calc(50% - (7.2rem / 2))",
        top: "calc(50% - (7.2rem / 2))",
      }}
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
        <PlayIconFilled sx={{ fontSize: "3.8rem", pl: ".5rem", color: "#fff" }} />
      </IconButton>
    </Box>
  );
};
