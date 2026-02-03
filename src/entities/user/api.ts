import { api } from "@/shared/api";

import { Response_MonthlyStreakSchema, Response_UserHomeDataSchema, UserSchema } from "./contracts";

export const userApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getHomeUserData: builder.query({
      query: () => ({
        url: "home/private",
      }),
      transformResponse: (res) => {
        try {
          return Response_UserHomeDataSchema.parse(res);
        } catch (err) {
          console.log("VALIDATE ERROR", err);
        }
      },
    }),
    getUserProfile: builder.query({
      keepUnusedDataFor: 5,
      query: () => ({
        url: "users/profile",
      }),
      transformResponse: (res) => {
        try {
          return UserSchema.parse(res);
        } catch (err) {
          console.error("VALIDATE ERROR", err);
        }
      },
    }),
    getMonthlyStreak: builder.query({
      keepUnusedDataFor: 5,
      query: () => ({
        url: "users/streak_monthly",
      }),
      transformResponse: (res) => {
        try {
          return Response_MonthlyStreakSchema.parse(res);
        } catch (err) {
          console.error("VALIDATE ERROR", err);
        }
      },
    }),
    logout: builder.query({
      query: () => ({
        url: "users/logout",
      }),
    }),
  }),
});
