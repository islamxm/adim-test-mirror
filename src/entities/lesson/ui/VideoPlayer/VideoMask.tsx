import { alpha, Box, Stack } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { VideoControls } from "./VideoControls";
import { useMediaState } from "@vidstack/react";
import { AnimatePresence, motion } from "motion/react";
import { PlayBigButton } from "./PlayBigButton";
import { PauseBigButton } from "./PauseBigButton";
import { WaitingBigButton } from "./WaitingBigButton";
import { ReplayBigButton } from "./ReplayBigButton";

export const VideoMask = () => {
  const [isShowMask, setIsShowMask] = useState(true);
  const isPaused = useMediaState("paused");
  const isPlaying = useMediaState("playing");
  const isWaiting = useMediaState("waiting");
  const isStarted = useMediaState("started");
  const isEnded = useMediaState("ended");
  const isFetching = !useMediaState("canPlay");

  const maskShowTimer = useRef<NodeJS.Timeout>(null);

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

  // clean effect
  useEffect(() => {
    return () => {
      deleteMaskTimer();
    };
  }, []);

  useEffect(() => {
    if (isEnded) {
      deleteMaskTimer();
      setIsShowMask(true);
    }
  }, [isEnded]);

  return (
    <Box
      sx={{
        position: "absolute",
        inset: 0,
      }}
      component={"div"}
      onMouseMove={onMouseMove}
    >
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
            {!isEnded && (isFetching || isWaiting) && <WaitingBigButton />}
            {!isEnded && !isFetching && isPaused && <PlayBigButton />}
            {!isEnded && !isFetching && isPlaying && <PauseBigButton />}
            {isEnded && <ReplayBigButton />}
            <VideoControls />
          </Stack>
        )}
      </AnimatePresence>
    </Box>
  );
};
