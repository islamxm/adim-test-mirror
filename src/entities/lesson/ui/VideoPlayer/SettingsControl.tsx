import { ReactNode, useEffect, useRef, useState } from "react";

import { ClickAwayListener, IconButton, Tooltip } from "@mui/material";
import { useMediaPlayer, useMediaState, useVideoQualityOptions } from "@vidstack/react";

import { SettingsIcon } from "@/shared/ui/icons";

import { Content, OptionsMenu } from "./OptionsMenu";
import { QualitiesContent } from "./QualtitiesContent";
import { SpeedContent } from "./SpeedContent";

export const SettingsControl = () => {
  const player = useMediaPlayer();
  const playbackRate = useMediaState("playbackRate");
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
      <OptionsMenu
        quality={options.find((f) => f.value === options.selectedValue)?.label}
        speed={playbackRate}
        onSelect={setActiveView}
      />
    ),
    quality: <QualitiesContent isAuto={isAutoQuality} avilableQualities={options} />,
    speed: (
      <SpeedContent
        value={playbackRate}
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
