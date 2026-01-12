import { z } from "zod";
import {
  Payload_AuthSchema,
  Response_GoogleAuthSchema,
  Response_UserHomeDataSchema,
  UserSchema,
} from "./contracts";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type AuthType = "login" | "register" | "verify";
export type StreakStatus =
  | "disabled"
  | "current"
  | "active"
  | "final"
  | "complete";


export type UserDto = z.infer<typeof UserSchema>;
export type User = UserDto;
export type UserStreak = z.infer<
  typeof Response_UserHomeDataSchema.shape.userStreak
>;

export type Response_AuthGoogle = z.infer<typeof Response_GoogleAuthSchema>;
export type Response_UserHomeData = z.infer<typeof Response_UserHomeDataSchema>;

export type Payload_Auth = z.infer<typeof Payload_AuthSchema>;


type UserSliceInitialState = {
  isAuth: boolean | undefined;
};
const userSliceInitialState: UserSliceInitialState = {
  isAuth: undefined,
};
export const userSlice = createSlice({
  initialState: userSliceInitialState,
  name: "user",
  reducers: {
    updateAuthStatus: (state, { payload }: PayloadAction<boolean>) => {
      state.isAuth = payload;
    },
  },
});
