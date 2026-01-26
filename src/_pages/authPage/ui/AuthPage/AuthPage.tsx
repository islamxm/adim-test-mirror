"use client";
import { Box, Stack } from "@mui/material";

import { UIStatus } from "@/shared/types";

import { AuthType } from "@/entities/user";

import { AuthWithGoogleBtn } from "@/features/auth/google";
import { LoginForm } from "@/features/auth/login";
import { RegisterForm } from "@/features/auth/register";

import { PageEnterAnimationLayout } from "@/widgets/pageEnterAnimationLayout";

import { AuthBg } from "../AuthBg/AuthBg";
import { AuthFormLayout } from "../AuthFormLayout/AuthFormLayout";

const renderAuthForm = (type: AuthType, setStatus?: (status: UIStatus) => void) => {
  return (
    <>
      {type === "login" && (
        <Box>
          <LoginForm
            isActive={type === "login"}
            setStatus={setStatus}
            oauth={<AuthWithGoogleBtn setStatus={setStatus} />}
          />
        </Box>
      )}
      {type === "register" && (
        <Box>
          <RegisterForm
            isActive={type === "register"}
            setStatus={setStatus}
            oauth={<AuthWithGoogleBtn setStatus={setStatus} />}
          />
        </Box>
      )}
    </>
  );
};

export const AuthPage = () => {
  return (
    <PageEnterAnimationLayout>
      <Stack
        sx={{ position: "relative" }}
        justifyContent={"center"}
        alignItems={"center"}
        height={"100%"}
      >
        <AuthFormLayout bg={({ type }) => <AuthBg type={type} />}>
          {({ setStatus, type }) => renderAuthForm(type, setStatus)}
        </AuthFormLayout>
      </Stack>
    </PageEnterAnimationLayout>
  );
};
