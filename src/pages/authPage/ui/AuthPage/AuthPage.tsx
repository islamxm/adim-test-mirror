"use client";
import { AuthFormLayout, AuthType } from "@/entities/user";
import { AuthWithGoogleBtn } from "@/features/auth/google";
import { LoginForm } from "@/features/auth/login";
import { RegisterForm } from "@/features/auth/register";
import { UIStatus } from "@/shared/types";
import { Box, Stack } from "@mui/material";
import { PageEnterAnimationLayout } from "@/widgets/pageEnterAnimationLayout";
import { AuthBg } from "../AuthBg/AuthBg";

const renderAuthForm = (
  type: AuthType,
  setStatus?: (status: UIStatus) => void
) => {
  return (
    <>
      <Box hidden={type !== "login"}>
        <LoginForm
          isActive={type === "login"}
          setStatus={setStatus}
          oauth={<AuthWithGoogleBtn setStatus={setStatus} />}
        />
      </Box>
      <Box hidden={type !== "register"}>
        <RegisterForm
          isActive={type === "register"}
          setStatus={setStatus}
          oauth={<AuthWithGoogleBtn setStatus={setStatus} />}
        />
      </Box>
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
        <AuthFormLayout  bg={({type}) => <AuthBg type={type}/>}>
          {({ setStatus, type }) => renderAuthForm(type, setStatus)}
        </AuthFormLayout>
      </Stack>
    </PageEnterAnimationLayout>
  );
};
