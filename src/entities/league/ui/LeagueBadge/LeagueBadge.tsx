import { Paper, PaperProps, Typography } from "@mui/material";
import { FC } from "react";
import { League, leagueMap } from "../../model";

type Props = {
  leagueName: League;
  sx?: PaperProps["sx"];
};

export const LeagueBadge: FC<Props> = ({
  leagueName = "BRONZE",
  sx
}) => {
  const leagueData = leagueMap[leagueName];

  return (
    <Paper
      sx={{
        height: "4.2rem",
        borderRadius: "2.1rem",
        display: "flex",
        gap: "0.4rem",
        alignItems: "center",
        px: "1.4rem",
        ...sx
      }}
    >
      <Typography fontSize={"1.8rem"}>{leagueData.label}</Typography>
      {leagueData.icon}
    </Paper>
  );
};
