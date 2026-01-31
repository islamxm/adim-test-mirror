import { Stack, Typography, useTheme } from "@mui/material";
import { motion } from "motion/react";

import { defaultComponentAnimation } from "@/shared/config";
import { StreakIcon } from "@/shared/ui/icons";

import { userApi } from "@/entities/user";
import { StreakDays } from "@/entities/user/ui/StreakDays/StreakDays";

import { StreakSkeleton } from "./Streak.skeleton";

export const Streak = () => {
  const { palette } = useTheme();
  const { data, isLoading, isError } = userApi.useGetHomeUserDataQuery({});

  if (!data || isLoading || isError) {
    return <StreakSkeleton />;
  }

  return (
    <Stack
      component={motion.div}
      {...defaultComponentAnimation}
      sx={{ p: "2.4rem 3.2rem" }}
      gap={"2.6rem"}
      direction={"row"}
    >
      <Stack
        sx={{
          width: "5.4rem",
          height: "5.4rem",
          flex: "0 0 auto",
          borderRadius: "50%",
          backgroundColor: palette.emerald.light,
          flexShrink: 0,
        }}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <StreakIcon sx={{ fontSize: "3.8rem", color: palette.primary.main }} />
      </Stack>
      <Stack gap={".8rem"}>
        <Typography sx={{ fontSize: "2rem", fontWeight: 600 }}>
          {data.userStreak.currentStreak} дней подряд
        </Typography>
        <Typography>На 8-ой день получите XP</Typography>
        <StreakDays streak={data.userStreak} />
      </Stack>
    </Stack>
  );
};
