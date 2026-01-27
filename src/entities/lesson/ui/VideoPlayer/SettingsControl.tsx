import { FC, ReactNode, useEffect, useRef, useState } from "react";

import {
  Button,
  ClickAwayListener,
  IconButton,
  Slider,
  Stack,
  Tooltip,
  Typography,
  alpha,
} from "@mui/material";
import { VideoQualityOptions, useMediaPlayer, useVideoQualityOptions } from "@vidstack/react";
import { AnimatePresence, motion } from "motion/react";

import {
  CheckIcon,
  ChevronRightIcon,
  ClockIcon,
  SettingsIcon,
  SliderIcon,
} from "@/shared/ui/icons";

type Content = "main" | "quality" | "speed";

const MainContent: FC<{
  onSelect?: (value: Content) => void;
  quality?: any;
  speed?: any;
}> = ({ onSelect, speed, quality }) => {
  return (
    <Stack sx={{ width: "30rem" }} gap={".5rem"}>
      <Button
        sx={{ borderRadius: "1.4rem", justifyContent: "space-between" }}
        color={"secondary"}
        startIcon={<SliderIcon />}
        variant={"text"}
        endIcon={<ChevronRightIcon />}
        onClick={() => onSelect?.("quality")}
      >
        <Stack sx={{ width: "100%" }} direction={"row"} justifyContent={"space-between"}>
          <Typography>Quality</Typography>
          <Typography>{quality}</Typography>
        </Stack>
      </Button>
      <Button
        sx={{ borderRadius: "1.4rem", justifyContent: "space-between" }}
        color={"secondary"}
        startIcon={<ClockIcon />}
        variant={"text"}
        endIcon={<ChevronRightIcon />}
        onClick={() => onSelect?.("speed")}
      >
        <Stack sx={{ width: "100%" }} direction={"row"} justifyContent={"space-between"}>
          <Typography>Speed</Typography>
          <Typography>{speed}x</Typography>
        </Stack>
      </Button>
    </Stack>
  );
};

const QualitiesContent: FC<{
  avilableQualities?: VideoQualityOptions;
  isAuto?: boolean;
}> = ({ avilableQualities, isAuto }) => {
  return (
    <Stack sx={{ width: "30rem" }} gap={".5rem"}>
      {avilableQualities?.map((quality, index) => {
        if (index === 0) {
          return (
            <Button
              key={index}
              sx={{ borderRadius: "1.4rem", justifyContent: "space-between" }}
              color={"secondary"}
              variant={"text"}
              onClick={() => quality.select()}
              endIcon={isAuto && <CheckIcon />}
            >
              Auto
            </Button>
          );
        }
        return (
          <Button
            key={index}
            sx={{ borderRadius: "1.4rem", justifyContent: "space-between" }}
            color={"secondary"}
            variant={"text"}
            onClick={() => quality.select()}
            endIcon={!isAuto && quality.quality?.selected && <CheckIcon />}
          >
            {quality.label}
          </Button>
        );
      })}
    </Stack>
  );
};

const SpeedContent: FC<{ onChange: (value: number) => void; value: number }> = ({
  onChange,
  value,
}) => {
  return (
    <Stack
      sx={{ width: "13.2rem", height: "9rem" }}
      alignItems={"center"}
      justifyContent={"center"}
    >
      <Typography>{value}x</Typography>
      <Slider
        min={0.5}
        max={1.5}
        value={value}
        step={0.5}
        onChange={(_, value) => onChange(value)}
        orientation={"horizontal"}
        sx={{
          width: "8.4rem",
        }}
        slotProps={{
          track: {
            style: {
              height: ".3rem",
              border: "none",
              borderRadius: ".2rem",
              backgroundColor: "#fff",
            },
          },
          rail: {
            style: {
              height: ".3rem",
              border: "none",
              borderRadius: ".2rem",
              backgroundColor: alpha("#fff", 0.3),
            },
          },
          thumb: {
            style: {
              width: ".9rem",
              height: ".9rem",
              backgroundColor: "#D9D9D9",
              boxShadow: "none",
            },
          },
        }}
      />
    </Stack>
  );
};

export const SettingsControl = () => {
  const player = useMediaPlayer();
  const [isOpen, setIsOpen] = useState(false);
  const [activeView, setActiveView] = useState<Content>("main");
  const options = useVideoQualityOptions();
  const isAutoQuality = options.selectedValue === "auto";
  const closeTimer = useRef<NodeJS.Timeout>(null);

  const onClose = () => {
    setIsOpen(false);
  };

  const onToggle = () => {
    setIsOpen((s) => !s);
  };

  useEffect(() => {
    if (isOpen && closeTimer.current) {
      clearTimeout(closeTimer.current);
    } else {
      closeTimer.current = setTimeout(() => {
        setActiveView("main");
        // 200 - потому что по дефолту на exit анимацию у MuiTooltip 195ms
      }, 200);
    }
    return () => {
      if (closeTimer.current) {
        clearTimeout(closeTimer.current);
      }
    };
  }, [isOpen]);

  const views: Record<Content, ReactNode> = {
    main: (
      <MainContent
        quality={options.find((f) => f.value === options.selectedValue)?.label}
        speed={player?.playbackRate}
        onSelect={setActiveView}
      />
    ),
    quality: <QualitiesContent isAuto={isAutoQuality} avilableQualities={options} />,
    speed: (
      <SpeedContent
        value={player?.playbackRate || 1}
        onChange={(value) => player?.remoteControl.changePlaybackRate(value)}
      />
    ),
  };

  return (
    <ClickAwayListener onClickAway={onClose}>
      <div>
        <Tooltip
          slotProps={{
            popper: {
              disablePortal: true,
              onClick: (e) => e.stopPropagation(),
            },
            tooltip: {
              sx: {
                padding: ".5rem",
                borderRadius: "1.6rem",
                maxWidth: "unset",
              },
            },

            // transition: {
            //   timeout: 0,
            // },
          }}
          disableFocusListener
          disableHoverListener
          disableTouchListener
          title={views[activeView]}
          placement={"top-start"}
          open={isOpen}
        >
          <IconButton onClick={onToggle} sx={{ color: "#fff" }}>
            <SettingsIcon
              sx={{
                fontSize: "2.4rem",
                rotate: isOpen ? "90deg" : "0deg",
                transition: "rotate .2s ease",
              }}
            />
          </IconButton>
        </Tooltip>
      </div>
    </ClickAwayListener>
  );
};
