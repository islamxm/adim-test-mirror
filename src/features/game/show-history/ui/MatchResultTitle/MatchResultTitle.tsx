import { FC } from "react";

import { Typography, TypographyProps } from "@mui/material";

import { GameResult } from "@/entities/competition";

type Props = {
  status: GameResult;
  sx?: TypographyProps["sx"];
};

const getData = (status: GameResult) => {
  switch (status) {
    case "WIN":
      return {
        color: "green",
        text: "Победил",
      };
    case "LOSE":
      return {
        color: "red",
        text: "Проиграл",
      };
    case "DRAW":
      return {
        color: "gray",
        text: "Ничья",
      };
    default:
      return {
        color: "gray",
        text: "N/D",
      };
  }
};

export const MatchResultTitle: FC<Props> = ({ status, sx }) => {
  const data = getData(status);

  return (
    <Typography sx={{ fontSize: "2.2rem", color: data.color, textAlign: "center", ...sx }}>
      {data.text}
    </Typography>
  );
};
