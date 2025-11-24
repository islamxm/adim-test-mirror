"use client";
import { AuthFormLayout, AuthType } from "@/entities/user";
import { AuthWithGoogleBtn } from "@/features/auth/google";
import { LoginForm } from "@/features/auth/login";
import { RegisterForm } from "@/features/auth/register";
import { UIStatus } from "@/shared/types";
import { Box, Stack } from "@mui/material";

const renderAuthForm = (
  type: AuthType,
  setStatus?: (status: UIStatus) => void
) => {
  return (
    <>
      <Box hidden={type !== "login"}>
        <LoginForm isActive={type === "login"} setStatus={setStatus} />
      </Box>
      <Box hidden={type !== "register"}>
        <RegisterForm isActive={type === "register"} setStatus={setStatus} />
      </Box>
    </>
  );
};

const REFRESH_TOKEN="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3NjQzMzcxOTIsImlhdCI6MTc2MzczMjM5MiwidXNlcl9pZCI6MywiZGV2aWNlX2lkIjoiY2JlOWZiMWYtODdiYi00OTUyLThiZWQtNGRkZjEyZmM4YWJiIiwibG9jYWxlIjoicnUiLCJzdGF0dXMiOjF9.dzw-_irfqtQeIgrSZe942Hz9mfKtfF_bIekfKpUy160"

export const AuthPage = () => {

  return (
    <Stack justifyContent={"center"} alignItems={"center"} height={"100%"}>
      <AuthFormLayout extra={<AuthWithGoogleBtn />}>
        {({ setStatus, type }) => renderAuthForm(type, setStatus)}
      </AuthFormLayout>
    </Stack>
  );
};
