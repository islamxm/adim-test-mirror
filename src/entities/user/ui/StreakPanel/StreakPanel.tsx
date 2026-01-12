import { FC } from "react";

import { Paper, Typography } from "@mui/material";

import { StreakIcon } from "@/shared/ui/icons";

import { UserStreak } from "../../model";

type Props = {
  data?: UserStreak["daysForPoint"];
};

export const StreakPanel: FC<Props> = ({ data }) => {
  return (
    <Paper
      sx={(theme) => ({
        height: "5.8rem",
        borderRadius: "3rem",
        display: "flex",
        gap: "0.4rem",
        alignItems: "center",
        px: "1.4rem",
        cursor: "pointer",
      })}
    >
      <StreakIcon
        sx={{
          fontSize: "2.4rem",
        }}
      />
      {data && (
        <Typography fontSize={"1.8rem"}>
          {data} {data > 1 ? "days" : "day"} sequence
        </Typography>
      )}
    </Paper>
  );
};
