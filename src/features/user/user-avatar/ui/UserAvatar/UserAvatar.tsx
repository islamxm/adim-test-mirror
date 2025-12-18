import { Avatar, userApi } from "@/entities/user";
import { motion } from "motion/react";

export const UserAvatar = () => {
  const {data} = userApi.useGetUserProfileQuery(undefined)

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      style={{flex: "0 0 auto"}}
      layout={"position"}
    >
      <Avatar isShadow size="4.8rem" avatarUrl={data?.avatarUrl}/>
    </motion.div>
  );
};
