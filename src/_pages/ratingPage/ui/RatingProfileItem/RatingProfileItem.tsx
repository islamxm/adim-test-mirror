import { FC } from "react";

import { Box, Paper, Stack, Typography } from "@mui/material";
import { motion } from "motion/react";

import { LeaderBoardUser } from "@/entities/league";
import { NoLeagueIcon } from "@/entities/league/icons";
import { Avatar, PointsBadge } from "@/entities/user";

type Props = {
  data: LeaderBoardUser;
  isActive?: boolean;
};

export const RatingProfileItem: FC<Props> = ({ data, isActive }) => {
  const { user, rank, points } = data;

  return (
    <Paper
      sx={(theme) => ({
        p: "1.6rem",
        borderRadius: "2.5rem",
        width: "100%",
        height: "9.6rem",
        overflow: "hidden",
        border: isActive ? `2px solid ${theme.palette.primary.main}` : "2px solid transparent",
      })}
      elevation={1}
      component={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <Stack gap={"1.6rem"} alignItems={"center"} direction={"row"}>
        {rank > 0 ? (
          <Typography
            textAlign={"center"}
            sx={{ width: "4.8rem", fontSize: "2.4rem", fontWeight: 600 }}
          >
            {rank}
          </Typography>
        ) : (
          <Typography textAlign={"center"} sx={{ width: "4.8rem", fontWeight: 600 }}>
            <NoLeagueIcon style={{ fontSize: "4.8rem" }} />
          </Typography>
        )}

        <Box sx={{ flexGrow: 1 }}>
          <Avatar
            avatarUrl={user.avatarUrl}
            gap={"2rem"}
            size="6.4rem"
            direction={"row"}
            label={user.profileName}
            shadowType={"dark"}
          />
        </Box>
        <PointsBadge sx={{ backgroundColor: "#EEEEEE" }} elevation={0} value={points} />
      </Stack>
    </Paper>
  );
};
