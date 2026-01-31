import { Box } from "@mui/material";
import { motion } from "motion/react";

import { useRouterProgress } from "@/shared/lib";
import { getProfilePage } from "@/shared/model";

import { Avatar, userApi } from "@/entities/user";

export const UserAvatar = () => {
  const { data } = userApi.useGetUserProfileQuery(undefined);
  const router = useRouterProgress();
  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      sx={{ flex: "0 0 auto", cursor: "pointer" }}
      onClick={() => router.push(getProfilePage())}
    >
      <Avatar shadowType={"dark"} size="4.8rem" avatarUrl={data?.avatarUrl} />
    </Box>
  );
};
