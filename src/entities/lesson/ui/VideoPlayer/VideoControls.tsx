import { Box, IconButton, Stack } from "@mui/material";
import classes from "./classes.module.scss";
import {
  FullScreenIcon,
  PauseIcon,
  PlayIconFilled,
  SettingsIcon,
  VolumeIcon,
} from "@/shared/ui/icons";
import {
  Time,
  TimeSlider,
  useMediaPlayer,
  useMediaState,
} from "@vidstack/react";
import { useState } from "react";
import { motion } from "motion/react";

export const VideoControls = () => {
  const player = useMediaPlayer();
  const playbackRate = useMediaState("playbackRate");
  const [isShowControls, setIsShowControls] = useState(false);
  const isPaused = useMediaState("paused");
  // const isPlaying = useMediaState("playing");

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

  const toggleSound = () => {
    if (player) {
      if (player.state.muted) {
        player.remoteControl.unmute();
      } else {
        player.remoteControl.mute();
      }
    }
  };

  const toggleFullscreen = () => {
    if (player) {
      if (player.state.fullscreen) {
        player.remoteControl.exitFullscreen();
      } else {
        player.remoteControl.enterFullscreen();
      }
    }
  };

  if (!player) {
    return null;
  }

  return (
    <Box
      component={"div"}
      onMouseEnter={() => setIsShowControls(true)}
      onMouseLeave={() => setIsShowControls(false)}
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
          <IconButton
            onClick={togglePlay}
            sx={{ color: "#fff", width: "5rem", height: "5rem" }}
          >
            {isPaused ? (
              <PlayIconFilled sx={{ fontSize: "3.8rem" }} />
            ) : (
              <PauseIcon sx={{ fontSize: "2.8rem" }} />
            )}
          </IconButton>

          {/* Timeline */}
          <Box
            component={motion.div}
            layoutId="timeline"
            sx={{ flex: "1 0 auto" }}
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

          {/* Ex action */}
          <Stack alignItems={"center"} direction={"row"} gap={"1rem"}>
            <IconButton onClick={toggleSound} sx={{ color: "#fff" }}>
              <VolumeIcon sx={{ fontSize: "2.4rem" }} />
            </IconButton>
            <IconButton onClick={toggleFullscreen} sx={{ color: "#fff" }}>
              <FullScreenIcon sx={{ fontSize: "2.4rem" }} />
            </IconButton>
            <IconButton sx={{ color: "#fff" }}>
              <SettingsIcon sx={{ fontSize: "2.4rem" }} />
            </IconButton>
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
