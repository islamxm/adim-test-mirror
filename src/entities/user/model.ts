import { z } from "zod";
import { DefaultResponseErrorData, Response } from "@/shared/types";
import {
  AuthCredentialsSchema,
  AuthSuccessGoogleResponseSchema,
  AuthSuccessResponseSchema,
  UserHomeDataSuccessResponseSchema,
  UserSchema,
} from "./contracts";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type AuthType = "login" | "register" | "verify";
export type AuthCredentials = z.infer<typeof AuthCredentialsSchema>;
export type AuthResponse = Response<
  z.infer<typeof AuthSuccessResponseSchema>,
  DefaultResponseErrorData
>;
export type AuthGoogleResponse = Response<
  z.infer<typeof AuthSuccessGoogleResponseSchema>,
  DefaultResponseErrorData
>;
export type User = z.infer<typeof UserSchema>;

export type UserStreak = z.infer<
  typeof UserHomeDataSuccessResponseSchema.shape.userStreak
>;

export type UserHomeDataResponse = Response<
  z.infer<typeof UserHomeDataSuccessResponseSchema>,
  DefaultResponseErrorData
>;

export type StreakStatus = "disabled" | "current" | "active" | "final" | "complete"

type UserSliceInitialType = {
  isAuth: boolean | undefined;
}
const userSliceInitialState: UserSliceInitialType = {
  isAuth: undefined
}

export const userSlice = createSlice({
  initialState: userSliceInitialState,
  name: "user",
  reducers: {
    updateAuthStatus: (state, {payload}: PayloadAction<boolean>) => {state.isAuth = payload}
  }
})