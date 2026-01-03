import { LeaderBoardUser } from "@/entities/league";
import { Avatar, PointsBadge } from "@/entities/user";
import { Stack, Typography } from "@mui/material";
import { FC } from "react";
import { TopPlace } from "../../model";
import { motion } from "motion/react";

type Props = {
  data?: LeaderBoardUser;
  place: TopPlace;
};

export const RatingTopProfile: FC<Props> = ({ data, place }) => {

  return (
    <Stack component={motion.div} initial={{ opacity: 0 }} animate={{ opacity: 1 }} sx={{ transform: `translateY(${place === "FIRST" ? "-2rem" : 0})` }} gap={"1.2rem"} justifyContent={"center"} alignItems={"center"}>
      <Avatar size={place === 'FIRST' ? "16.4rem" : "14.4rem"} avatarUrl={data?.user.avatarUrl} isShadow />
      <Typography
        textAlign={"center"}
        variant={"body1"}
        sx={{
          fontSize: "2.2rem",
          fontWeight: 600,
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap"
        }}
      >
        {`${data?.rank}. ${data?.user.profileName}`}
      </Typography>
      <PointsBadge value={data?.points} />
    </Stack>
  );
};
