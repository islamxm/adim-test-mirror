import { FC } from "react";

import { Stack, Typography } from "@mui/material";
import { motion } from "motion/react";

import { LeaderBoardUser } from "@/entities/league";
import { Avatar, PointsBadge } from "@/entities/user";

import { TopPlace } from "../../model";

type Props = {
  data?: LeaderBoardUser;
  place: TopPlace;
};

export const RatingTopProfile: FC<Props> = ({ data, place }) => {
  return (
    <Stack
      component={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      sx={{
        transform: `translateY(${place === "FIRST" ? "-2rem" : 0})`,
        minWidth: 0,
      }}
      gap={"1.2rem"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Avatar
        size={place === "FIRST" ? "16.4rem" : "14.4rem"}
        avatarUrl={data?.user.avatarUrl}
        shadowType={"0 0 10px #00FFA826"}
      />
      <Typography
        textAlign={"center"}
        variant={"body1"}
        // noWrap
        sx={{
          fontSize: "2.2rem",
          fontWeight: 600,
          width: "100%",
        }}
      >
        {`${data?.rank}. ${data?.user.profileName}`}
      </Typography>
      <PointsBadge value={data?.points} />
    </Stack>
  );
};
