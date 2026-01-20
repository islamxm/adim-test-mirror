import { FC } from "react";

import { Typography } from "@mui/material";

import { User } from "@/entities/user";

import { SearchDots } from "../Player/SearchDots";

type Props = Partial<Pick<User, "profileName">> & {
  textAlign?: "left" | "center" | "right";
};

export const PlayerName: FC<Props> = ({ profileName, textAlign }) => {
  return (
    <Typography sx={{ height: "2.5rem", textAlign, maxWidth: "23rem" }} noWrap variant="h3">
      {profileName || <SearchDots />}
    </Typography>
  );
};
