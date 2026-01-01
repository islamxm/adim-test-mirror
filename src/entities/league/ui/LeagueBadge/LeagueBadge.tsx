import { Paper, Typography } from "@mui/material";
import { BronzeIcon } from "../../icons";
import { FC } from "react";
import { League, leagueMap } from "../../model";

type Props = {
  leagueName: League
}

export const LeagueBadge:FC<Props> = ({
  leagueName = "BRONZE"
}) => {
  const leagueData = leagueMap[leagueName];

  return (
    <Paper
      sx={(theme) => ({
        height: "4.2rem",
        borderRadius: "2.1rem",
        display: "flex",
        gap: "0.4rem",
        alignItems: "center",
        px: "1.4rem",
      })}
    >
      <Typography fontSize={"1.8rem"}>{leagueData.label}</Typography>
      {leagueData.icon}
    </Paper>
  );
};
