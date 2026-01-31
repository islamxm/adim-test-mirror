import { Stack, Typography, alpha, useTheme } from "@mui/material";
import { motion } from "motion/react";

import { defaultComponentAnimation } from "@/shared/config";
import { PointFilledIcon } from "@/shared/ui/icons";

import { userApi } from "@/entities/user";

import { PointsSkeleton } from "./Points.skeleton";

export const Points = () => {
  const { data, isLoading, isError } = userApi.useGetUserProfileQuery({});

  const { palette } = useTheme();

  if (!data || isLoading || isError) {
    return <PointsSkeleton />;
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
          backgroundColor: alpha("#F0C23B26", 0.15),
          flexShrink: 0,
        }}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <PointFilledIcon sx={{ fontSize: "2.8rem", color: palette.gold.main }} />
      </Stack>
      <Stack gap={".8rem"}>
        <Typography sx={{ fontSize: "1.6rem" }}>Ваши XP</Typography>
        <Typography sx={{ fontSize: "2.4rem", fontWeight: 600 }}>{data.totalPoints}</Typography>
      </Stack>
    </Stack>
  );
};
