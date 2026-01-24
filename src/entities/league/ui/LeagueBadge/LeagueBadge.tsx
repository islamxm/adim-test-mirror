import { FC } from "react";

import { Paper, PaperProps, Typography, useTheme } from "@mui/material";

import { League, leagueMap } from "../../model";

type Props = {
  leagueName: League | null;
  sx?: PaperProps["sx"];
  onClick?: (league: League | null) => void;
  isActive?: boolean;
};

export const LeagueBadge: FC<Props> = ({ leagueName, sx, onClick, isActive }) => {
  const leagueData = leagueMap[leagueName ? leagueName : "NO_LEAGUE"];
  const { palette } = useTheme();

  const activeProps: PaperProps["sx"] = isActive
    ? {
        color: palette.primary.contrastText,
        backgroundColor: palette.primary.main,
      }
    : {};

  return (
    <Paper
      sx={{
        height: "4.2rem",
        borderRadius: "2.1rem",
        display: "flex",
        gap: "0.4rem",
        alignItems: "center",
        px: "1.4rem",
        cursor: onClick && "pointer",
        transition: "all .2s ease",
        "&:hover":
          onClick && !isActive
            ? {
                backgroundColor: "#E3FFF5",
              }
            : {},
        ...activeProps,
        ...sx,
      }}
      component={"div"}
      onClick={() => onClick?.(leagueName)}
    >
      <Typography noWrap fontSize={"1.8rem"}>
        {leagueData.label}
      </Typography>
      {leagueData.icon}
    </Paper>
  );
};
