import { useState } from "react";

import { Box, IconButton, Stack } from "@mui/material";
import { Time, TimeSlider, useMediaPlayer, useMediaState } from "@vidstack/react";
import { motion } from "motion/react";

import { PauseIcon, PlayIconFilled } from "@/shared/ui/icons";

import { ScreenControl } from "./ScreenControl";
import { SettingsControl } from "./SettingsControl";
import { VolumeControl } from "./VolumeControl";
import classes from "./classes.module.scss";

export const VideoControls = () => {
  const player = useMediaPlayer();
  const [isShowControls, setIsShowControls] = useState(true);
  const isPaused = useMediaState("paused");

  const togglePlay = () => {
    if (player) {
      if (player.state.playing) {
        player.pause();
      }
      if (player.state.paused) {
        player.play();
      }
    }
  };

  if (!player) {
    return null;
  }

  return (
    <Box
      component={"div"}
      // onMouseEnter={() => setIsShowControls(true)}
      // onMouseLeave={() => setIsShowControls(false)}
    >
      {isShowControls ? (
        <Stack
          alignItems={"center"}
          direction={"row"}
          className={classes.controls}
          gap={"1.6rem"}
          sx={{
            flexGrow: 1,
            position: "absolute",
            left: 0,
            bottom: 0,
          }}
          component={motion.div}
          initial={{ opacity: 0 }}
          exit={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {/* Play/Pause button */}
          <IconButton onClick={togglePlay} sx={{ color: "#fff", width: "5rem", height: "5rem" }}>
            {isPaused ? (
              <PlayIconFilled sx={{ fontSize: "3.8rem" }} />
            ) : (
              <PauseIcon sx={{ fontSize: "2.8rem" }} />
            )}
          </IconButton>

          {/* Timeline */}
          <Box component={motion.div} layoutId="timeline" sx={{ flex: "1 0 auto" }}>
            <TimeSlider.Root className={classes.timeline}>
              <TimeSlider.Track className={classes.timeline_track}>
                <TimeSlider.Progress
                  className={classes.timeline_track_progress}
                  style={{ width: "var(--slider-progress)" }}
                />
                <TimeSlider.TrackFill
                  className={classes.timeline_track_fill}
                  style={{ width: "var(--slider-fill)" }}
                />
              </TimeSlider.Track>
              <TimeSlider.Thumb
                style={{ left: "var(--slider-fill)" }}
                className={classes.timeline_thumb}
              />
            </TimeSlider.Root>
          </Box>

          {/* Timer */}
          <Stack className={classes.time} direction={"row"}>
            <Time type="current" />
            <span>/</span>
            <Time type="duration" />
          </Stack>

          <Stack alignItems={"center"} direction={"row"} gap={"1rem"}>
            <VolumeControl />
            <ScreenControl />
            <SettingsControl />
          </Stack>
        </Stack>
      ) : (
        <Box
          component={motion.div}
          initial={{ opacity: 0 }}
          exit={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className={classes.prev_timeline}
          sx={{ width: "100%", position: "absolute", left: 0, bottom: 0 }}
          layoutId="timeline"
        >
          <TimeSlider.Root className={classes.timeline}>
            <TimeSlider.Track className={classes.timeline_track}>
              <TimeSlider.Progress
                className={classes.timeline_track_progress}
                style={{ width: "var(--slider-progress)" }}
              />
              <TimeSlider.TrackFill
                className={classes.timeline_track_fill}
                style={{ width: "var(--slider-fill)" }}
              />
            </TimeSlider.Track>
          </TimeSlider.Root>
        </Box>
      )}
    </Box>
  );
};
