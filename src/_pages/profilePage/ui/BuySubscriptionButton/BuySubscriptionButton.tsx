import { Box } from "@mui/material";
import dayjs from "dayjs";
import { motion } from "motion/react";

import { defaultComponentAnimation } from "@/shared/config";
import { useRouterProgress } from "@/shared/lib";
import { getPricingPage } from "@/shared/model";
import { GlowingButton } from "@/shared/ui";

import { userApi } from "@/entities/user";

export const BuySubscriptionButton = () => {
  const router = useRouterProgress();
  const { data } = userApi.useGetUserProfileQuery({});
  const daysLeft = dayjs(data?.subscriptionExpiresAt).diff(dayjs(), "day");

  if (daysLeft > 0) {
    return null;
  }

  return (
    <Box component={motion.div} {...defaultComponentAnimation}>
      <GlowingButton
        onClick={() => router.push(getPricingPage())}
        sx={{ borderRadius: "2.3rem" }}
        fullWidth
      >
        Купить подписку
      </GlowingButton>
    </Box>
  );
};
