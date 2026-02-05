import { FC } from "react";

import { Button, Stack, Typography } from "@mui/material";

import { ChevronRightIcon, ClockIcon, SliderIcon } from "@/shared/ui/icons";

export type Content = "main" | "quality" | "speed";
export const OptionsMenu: FC<{
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
