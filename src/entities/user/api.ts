import { api } from "@/shared/api";

import { Response_UserHomeDataSchema, UserSchema } from "./contracts";

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
  }),
});
