import { FC } from "react";

import { Box, Stack, Typography } from "@mui/material";

import { Key1Icon, Key2Icon, Key3Icon, Key4Icon } from "@/shared/ui/icons";

import { Question } from "@/entities/competition";

type Props = Omit<Question["choices"][0], "key"> & {
  variant: string;
  isActive?: boolean;
  onChange?: () => void;
  index: number;
};

export const Variant: FC<Props> = ({ index, variant, value, isActive, onChange }) => {
  return (
    <Box
      sx={{
        p: 0,
        cursor: "pointer",
      }}
      onClick={onChange}
    >
      <Stack
        direction={"row"}
        gap={"1rem"}
        alignItems={"center"}
        sx={(theme) => ({
          position: "relative",
          width: "100%",
          height: "100%",
          minHeight: "14.2rem",
          borderRadius: "1.4rem",
          transition: "all .05s ease",
          p: "2.5rem",
          color: isActive ? theme.palette.primary.contrastText : theme.palette.text.primary,
          backgroundColor: isActive ? theme.palette.primary.main : theme.palette.common.white,
          "&: hover": {
            backgroundColor: !isActive && theme.palette.emerald.light,
          },
        })}
      >
        <Typography
          sx={{
            fontSize: "1.8rem",
            fontWeight: 600,
            textAlign: "left",
          }}
        >
          {value}
        </Typography>
        <Box sx={{ position: "absolute", bottom: "1rem", right: "1rem" }}>
          {index === 0 && <Key1Icon sx={{ fontSize: "4rem" }} />}
          {index === 1 && <Key2Icon sx={{ fontSize: "4rem" }} />}
          {index === 2 && <Key3Icon sx={{ fontSize: "4rem" }} />}
          {index === 3 && <Key4Icon sx={{ fontSize: "4rem" }} />}
        </Box>
      </Stack>
    </Box>
  );
};
