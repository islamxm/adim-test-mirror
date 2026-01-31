import { Box, Button, Link, Stack, Typography } from "@mui/material";
import dayjs from "dayjs";
import { motion } from "motion/react";

import { defaultComponentAnimation } from "@/shared/config";
import { EditIcon } from "@/shared/ui/icons";

import { Avatar, userApi } from "@/entities/user";

import { ProfileHeaderSkeleton } from "./ProfileHeader.skeleton";

export const ProfileHeader = () => {
  const { data, isLoading, isError } = userApi.useGetUserProfileQuery({});

  const daysLeft = dayjs(data?.subscriptionExpiresAt).diff(dayjs(), "day");

  if (!data || isLoading || isError) {
    return <ProfileHeaderSkeleton />;
  }

  return (
    <Box
      component={motion.div}
      {...defaultComponentAnimation}
      sx={{ maxWidth: "82rem", width: "100%", margin: "0 auto", p: "8.4rem 1rem" }}
    >
      <Stack gap={"1rem"} direction={"row"} alignItems={"center"} justifyContent={"space-between"}>
        <Stack alignItems={"center"} gap={"2.4rem"} direction={"row"}>
          <Avatar shadowType={"dark"} avatarUrl={data?.avatarUrl} size="12.4rem" />
          <Stack gap={".4rem"}>
            <Typography sx={{ fontSize: "2.4rem", fontWeight: 600 }}>
              {data?.profileName}
            </Typography>
            <Link
              href={`mailto:${data?.email}`}
              color="inherit"
              sx={(theme) => ({
                fontSize: "1.8rem",
                "&: hover": { color: theme.palette.primary.light },
              })}
            >
              {data?.email}
            </Link>
            <Typography sx={{ fontSize: "1.8rem" }}>
              Subscription <b>{daysLeft <= 0 ? 0 : daysLeft} days remaining</b>
            </Typography>
          </Stack>
        </Stack>
        <Button disabled endIcon={<EditIcon />} variant="contained">
          Edit profile
        </Button>
      </Stack>
    </Box>
  );
};
