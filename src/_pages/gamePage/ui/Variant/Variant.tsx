import { FC } from "react";

import { Paper, Stack, Typography } from "@mui/material";

import { Question } from "@/entities/competition";

type Props = Omit<Question["choices"][0], "key"> & {
  variant: string;
  isActive?: boolean;
  onChange?: () => void;
};

export const Variant: FC<Props> = ({ variant, value, isActive, onChange }) => {
  return (
    <Paper
      sx={(theme) => ({
        p: 0,
        backgroundColor: theme.palette.primary.main,
        borderRadius: "1.4rem",
        cursor: "pointer",
        "&:active > div": {
          transform: "translate(0)",
        },
      })}
      elevation={0}
      onClick={onChange}
    >
      <Stack
        direction={"row"}
        gap={"1rem"}
        alignItems={"center"}
        sx={(theme) => ({
          width: "100%",
          height: "100%",
          minHeight: "14.2rem",
          borderRadius: "1.4rem",
          transition: "all .05s ease",
          p: "2.5rem",
          color: isActive ? theme.palette.primary.contrastText : theme.palette.text.primary,
          backgroundColor: isActive ? theme.palette.primary.main : theme.palette.common.white,
          "&: hover": {
            transform: "translate(-4px, -4px)",
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
      </Stack>
    </Paper>
  );
};
