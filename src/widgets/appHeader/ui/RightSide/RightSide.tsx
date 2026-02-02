import { useSession } from "next-auth/react";

import { Stack } from "@mui/material";
import { motion } from "motion/react";

import { useSelector } from "@/shared/lib";

import { LoginButton } from "@/features/auth/login";
import { RegisterButton } from "@/features/auth/register";

export const RightSide = () => {
  const { status } = useSession();

  return (
    status === "unauthenticated" && (
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
    )
  );
};
