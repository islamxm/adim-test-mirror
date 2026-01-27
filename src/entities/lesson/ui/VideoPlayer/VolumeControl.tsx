import { useState } from "react";

import { IconButton, Slider, Stack, Tooltip, alpha } from "@mui/material";
import { useMediaPlayer, useMediaState } from "@vidstack/react";
import { AnimatePresence, motion } from "motion/react";

import { VolumeIcon, VolumeLowIcon, VolumeMutedIcon } from "@/shared/ui/icons";

// дефолтное значение скорее всего нужно брать из localStorage или же всегда задавать 50%
const DEFAULT_VOLUME_VALUE = 0.5;

const stateIcon = (volume?: number, isMuted?: boolean) => {
  if (typeof volume !== "number") {
    return;
  } else {
    if (volume === 0 || isMuted) {
      return <VolumeMutedIcon sx={{ fontSize: "2.4rem" }} />;
    }
    if (volume <= 0.5 && volume > 0) {
      return <VolumeLowIcon sx={{ fontSize: "2.4rem" }} />;
    }
    if (volume > 0.5) {
      return <VolumeIcon sx={{ fontSize: "2.4rem" }} />;
    }
  }
};

export const VolumeControl = () => {
  const player = useMediaPlayer();
  const volume = useMediaState("volume");
  const muted = useMediaState("muted");

  const mute = () => {
    if (!player) return;
    player.remoteControl.mute();
  };

  const unmute = () => {
    if (!player) return;
    player.remoteControl.unmute();
  };

  const onToggleVolume = () => {
    if (!player) return;
    if (muted) {
      unmute();
    } else {
      mute();
    }
  };

  const onChangeVolume = (_: any, v: number) => {
    player?.remoteControl.changeVolume(v);
  };

  return (
    <Tooltip
      placement="top"
      slotProps={{
        tooltip: {
          sx: {
            p: "1.6rem .5rem",
            borderRadius: "1.6rem",
          },
        },
      }}
      title={
        <Stack
          sx={{ height: "15.6rem", width: "5.8rem" }}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Slider
            orientation={"vertical"}
            min={0}
            max={1}
            step={0.01}
            value={volume}
            onChange={onChangeVolume}
            sx={{
              overflow: "hidden",
              borderRadius: ".5rem",
              // border: "1px solid red",
              p: "0",
              width: "1rem",
              color: "#fff",
              "& .MuiSlider-thumb": {
                "&:before": {
                  boxShadow: "none",
                },
              },
            }}
            slotProps={{
              track: {
                style: {
                  width: "1rem",
                  backgroundColor: "#FFD24E",
                  border: "none",
                  borderRadius: "0 0 .5rem .5rem",
                },
              },
              rail: {
                style: {
                  width: "1rem",
                  borderRadius: ".5rem",
                  backgroundColor: alpha("#fff", 0.3),
                },
              },
              thumb: {
                style: {
                  width: "1rem",
                  height: "1rem",
                  backgroundColor: "#FFD24E",
                  boxShadow: "none",
                },
              },
            }}
          />
        </Stack>
      }
    >
      <IconButton onClick={onToggleVolume} sx={{ color: "#fff" }}>
        <AnimatePresence mode="popLayout">{stateIcon(player?.volume, muted)}</AnimatePresence>
      </IconButton>
    </Tooltip>
  );
};
