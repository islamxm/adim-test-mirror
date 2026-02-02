import { ReactNode } from "react";

import { StackProps } from "@mui/material";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { z } from "zod";

import {
  DeviceInfoSchema,
  Payload_AuthSchema,
  Payload_LoginSchema,
  Payload_RegisterSchema,
  Payload_VerifySchema,
  Response_GoogleAuthSchema,
  Response_UserHomeDataSchema,
  UserSchema,
} from "./contracts";

export type AuthType = "login" | "register" | "verify";
export type StreakStatus = "disabled" | "current" | "active" | "final" | "complete";
export type DeviceInfo = z.infer<typeof DeviceInfoSchema>;

export type UserDto = z.infer<typeof UserSchema>;
export type User = UserDto;
export type UserStreak = z.infer<typeof Response_UserHomeDataSchema.shape.userStreak>;

export type Response_AuthGoogle = z.infer<typeof Response_GoogleAuthSchema>;
export type Response_UserHomeData = z.infer<typeof Response_UserHomeDataSchema>;

export type Payload_Auth = z.infer<typeof Payload_AuthSchema>;
export type Payload_Register = z.infer<typeof Payload_RegisterSchema>;
export type Payload_Login = z.infer<typeof Payload_LoginSchema>;
export type Payload_Verify = z.infer<typeof Payload_VerifySchema>;

export type AuthStatus = "loading" | "authenticated" | "unauthenticated";

type UserSliceInitialState = {
  authStatus: AuthStatus;
  accessToken?: string;
};
const userSliceInitialState: UserSliceInitialState = {
  authStatus: "loading",
  accessToken: undefined,
};
export const userSlice = createSlice({
  initialState: userSliceInitialState,
  name: "user",
  reducers: {
    updateAuthStatus: (state, { payload }: PayloadAction<AuthStatus>) => {
      state.authStatus = payload;
    },
    updateAccessToken: (state, { payload }: PayloadAction<string | undefined>) => {
      state.accessToken = payload;
    },
  },
});

type ShadowType = "light" | "dark" | string;

export type AvatarComponentProps = {
  avatarUrl?: User["avatarUrl"];
  size?: string;
  label?: ReactNode;
  extra?: ReactNode;
  shadowType?: ShadowType;
  direction?: StackProps["direction"];
  gap?: StackProps["gap"];
  backgroundColor?: string;
  isRounded?: boolean;
  isDisabled?: boolean;
  isActive?: boolean;
};
