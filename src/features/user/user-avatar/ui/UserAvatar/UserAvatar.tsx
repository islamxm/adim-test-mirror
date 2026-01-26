import { motion } from "motion/react";

import { Avatar, userApi } from "@/entities/user";

export const UserAvatar = () => {
  const { data } = userApi.useGetUserProfileQuery(undefined);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      style={{ flex: "0 0 auto" }}
    >
      <Avatar shadowType={"dark"} size="4.8rem" avatarUrl={data?.avatarUrl} />
    </motion.div>
  );
};
