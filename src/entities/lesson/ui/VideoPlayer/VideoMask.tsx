import { useEffect, useRef, useState } from "react";

import { Box, Stack, alpha } from "@mui/material";
import { useMediaPlayer, useMediaState } from "@vidstack/react";
import { AnimatePresence, motion } from "motion/react";
import useDoubleClick from "use-double-click";

import { PauseBigButton } from "./PauseBigButton";
import { PlayBigButton } from "./PlayBigButton";
import { ReplayBigButton } from "./ReplayBigButton";
import { SeekBackwardControl } from "./SeekBackwardControl";
import { SeekForwardControl } from "./SeekForwardControl";
import { VideoControls } from "./VideoControls";
import { WaitingBigButton } from "./WaitingBigButton";

export const VideoMask = () => {
  const maskRef = useRef<HTMLDivElement>(null);
  const [isShowMask, setIsShowMask] = useState(true);
  const isPaused = useMediaState("paused");
  const isPlaying = useMediaState("playing");
  const isWaiting = useMediaState("waiting");
  const isStarted = useMediaState("started");
  const isEnded = useMediaState("ended");
  const isSeeking = useMediaState("seeking");
  const canPlay = useMediaState("canPlay");
  const isFullscreen = useMediaState("fullscreen");
  const player = useMediaPlayer();

  const maskShowTimer = useRef<NodeJS.Timeout>(null);

  const isLoading = (!canPlay || isWaiting || isSeeking) && !isEnded;

  const deleteMaskTimer = () => {
    if (maskShowTimer.current) {
      clearTimeout(maskShowTimer.current);
      maskShowTimer.current = null;
    }
  };

  const createMaskTimer = () => {
    deleteMaskTimer();
    setIsShowMask(true);
    maskShowTimer.current = setTimeout(() => setIsShowMask(false), 3000);
  };

  const onMouseMove = () => {
    if (isStarted && !isEnded) {
      createMaskTimer();
    }
  };

  useEffect(() => {
    if (isEnded) {
      deleteMaskTimer();
      setIsShowMask(true);
    }
  }, [isEnded]);

  useEffect(() => {
    return () => {
      deleteMaskTimer();
    };
  }, []);

  useDoubleClick({
    onDoubleClick: (e) => {
      const target = e.target as HTMLElement;
      if (target.closest(".disable-db-click")) return;
      if (isFullscreen) {
        player?.remoteControl.exitFullscreen();
      } else {
        player?.remoteControl.enterFullscreen();
      }
    },
    ref: maskRef,
    latency: 250,
  });

  console.log("waiting: ", isWaiting);

  return (
    <Box
      sx={{
        position: "absolute",
        inset: 0,
      }}
      ref={maskRef}
      component={"div"}
      onMouseMove={onMouseMove}
      onClick={onMouseMove}
    >
      <AnimatePresence>{!isLoading && isPaused && <PlayBigButton />}</AnimatePresence>

      <AnimatePresence mode="wait">
        {isShowMask && (
          <Stack
            sx={{
              backgroundColor: alpha("#000", 0.4),
              width: "100%",
              height: "100%",
            }}
            justifyContent={"center"}
            alignItems={"center"}
            component={motion.div}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Stack
              className={"disable-db-click"}
              sx={{ width: "100%" }}
              direction={"row"}
              gap={"2rem"}
            >
              <Stack alignItems={"center"} justifyContent={"center"} sx={{ flex: 1 }}>
                <SeekBackwardControl />
              </Stack>
              <Box sx={{ width: "7.2rem", height: "7.2rem" }}>
                {isLoading && <WaitingBigButton />}
                {!isLoading && isPlaying && <PauseBigButton />}
                {isEnded && <ReplayBigButton />}
              </Box>
              <Stack alignItems={"center"} justifyContent={"center"} sx={{ flex: 1 }}>
                <SeekForwardControl />
              </Stack>
            </Stack>

            <VideoControls />
          </Stack>
        )}
      </AnimatePresence>
    </Box>
  );
};
