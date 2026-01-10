import { Stack, Box } from "@mui/material";
import { LeaderBoardUser } from "@/entities/league";
import { FC } from "react";
import { RatingTopProfile } from "@/_pages/ratingPage/ui/RatingTopProfile/RatingTopProfile";
import { motion } from "motion/react";
import { RatingTopProfileSkeleton } from "../RatingTopProfile/RatingTopProfile.skeleton";

type Props = {
  data: Array<LeaderBoardUser>;
};

export const RatingTopThree: FC<Props> = ({ data }) => {
  const first = data.find((f) => f.rank === 1);
  const second = data.find((f) => f.rank === 2);
  const third = data.find((f) => f.rank === 3);

  return (
    <Stack
      direction={"row"}
      justifyContent={"center"}
      alignItems={"flex-end"}
      gap={"17rem"}
      component={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <Box sx={{ minWidth: 0, flex: 1 }}>
        {second ? (
          <RatingTopProfile place={"SECOND"} data={second} />
        ) : (
          <RatingTopProfileSkeleton />
        )}
      </Box>
      <Box sx={{ minWidth: 0, flex: 1 }}>
        {first ? (
          <RatingTopProfile place={"FIRST"} data={first} />
        ) : (
          <RatingTopProfileSkeleton isFirst />
        )}
      </Box>
      <Box sx={{ minWidth: 0, flex: 1 }}>
        {third ? (
          <RatingTopProfile place={"THIRD"} data={third} />
        ) : (
          <RatingTopProfileSkeleton />
        )}
      </Box>
    </Stack>
  );
};
