import { FC } from "react";

import { Box, Typography, TypographyProps } from "@mui/material";
import { motion } from "motion/react";

import { User } from "@/entities/user/@x/competition";

import { SearchDots } from "../Player/SearchDots";

type Props = Partial<Pick<User, "profileName">> & {
  textAlign?: "left" | "center" | "right";
  sx?: TypographyProps["sx"];
};

export const PlayerName: FC<Props> = ({ profileName, textAlign, sx }) => {
  return (
    <Box
      component={motion.p}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      sx={{ height: "2.5rem", maxWidth: "23rem", ...sx }}
    >
      {profileName ? (
        <Typography textAlign={textAlign} variant="h3" noWrap>
          {profileName}
        </Typography>
      ) : (
        <SearchDots />
      )}
    </Box>
  );
};
