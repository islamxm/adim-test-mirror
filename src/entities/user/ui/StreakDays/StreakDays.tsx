import { FC } from "react";

import { Stack } from "@mui/material";
import { motion } from "motion/react";

import { getStreakStatus } from "../../lib";
import { UserStreak } from "../../model";
import { StreakDay } from "../StreakDay/StreakDay";

const DAYS = 7;
type Props = {
  streak: UserStreak;
};
export const StreakDays: FC<Props> = ({ streak }) => {
  return (
    <Stack
      direction={"row"}
      gap={".4rem"}
      component={motion.div}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            delayChildren: 0.1,
            staggerChildren: 0.08,
          },
        },
      }}
      initial="hidden"
      animate="visible"
    >
      {new Array(DAYS + 1).fill(true).map((_, index) => (
        <motion.div
          variants={{
            hidden: { scale: 0, opacity: 0 },
            visible: { scale: 1, opacity: 1 },
          }}
          key={index}
        >
          <StreakDay
            status={getStreakStatus({
              day: index + 1,
              streak,
            })}
          />
        </motion.div>
      ))}
    </Stack>
  );
};
