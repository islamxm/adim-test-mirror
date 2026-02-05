import { FC } from "react";

import { Slider, Stack, Typography, alpha } from "@mui/material";

export const SpeedContent: FC<{ onChange: (value: number) => void; value?: number }> = ({
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
        step={0.25}
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
