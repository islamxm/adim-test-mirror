import { FC } from "react";

import { Typography } from "@mui/material";
import { motion } from "motion/react";

import { User } from "@/entities/user";

import { SearchDots } from "../Player/SearchDots";

type Props = Partial<Pick<User, "profileName">> & {
  textAlign?: "left" | "center" | "right";
};

export const PlayerName: FC<Props> = ({ profileName, textAlign }) => {
  return (
    <Typography
      component={motion.p}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      sx={{ height: "2.5rem", textAlign, maxWidth: "23rem" }}
      noWrap
      variant="h3"
    >
      {profileName || <SearchDots />}
    </Typography>
  );
};
