import { Box, Stack } from "@mui/material";
import { motion } from "motion/react";

import { useRouterProgress } from "@/shared/lib";
import { getProfilePage } from "@/shared/model";

import { League, leagueMap } from "@/entities/league";
import { Avatar, userApi } from "@/entities/user";

export const UserAvatar = () => {
  const { data } = userApi.useGetUserProfileQuery(undefined);
  const router = useRouterProgress();

  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      sx={{ flex: "0 0 auto", cursor: "pointer", position: "relative" }}
      onClick={() => router.push(getProfilePage())}
    >
      <Stack style={{ position: "absolute", bottom: 0, left: "-1rem" }}>
        {leagueMap[(data?.leagueName as League) || "NO_LEAGUE"].icon}
      </Stack>

      <Avatar shadowType={"dark"} size="4.8rem" avatarUrl={data?.avatarUrl} isActive />
    </Box>
  );
};
