import { useSelector } from "@/shared/lib";
import { motion } from "motion/react";
import { League, LeagueBadge } from "@/entities/league";
import { userApi } from "@/entities/user";
import { Box, Stack } from "@mui/material";
import { RegisterButton } from "@/features/auth/register";
import { LoginButton } from "@/features/auth/login";

export const RightSide = () => {
  const { isAuth } = useSelector((s) => s.user);
  const { data, isError, isLoading } =
    userApi.useGetUserProfileQuery(undefined, {skip: !isAuth});

  return (
    <>
      {data && !isError && !isLoading && (
        <Box
          initial={{ opacity: 0, scale: 0 }}
          exit={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          sx={{ height: "100%", justifySelf: "flex-start" }}
          component={motion.div}
        >
          <LeagueBadge
            sx={{ borderRadius: "3rem", height: "100%" }}
            leagueName={data?.leagueName as League}
          />
        </Box>
      )}
      {!data && !isAuth && !isLoading && isError && (
        <Stack
          initial={{ opacity: 0, scale: 0 }}
          exit={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          component={motion.div}
          justifyContent={"flex-end"}
          direction={"row"}
          gap={"1rem"}
          sx={{ width: "100%", px: "1rem" }}
        >
          <RegisterButton />
          <LoginButton />
        </Stack>
      )}
    </>
  );
};
