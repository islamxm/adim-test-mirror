import { getSession, signIn, signOut, useSession } from "next-auth/react";

import { BaseQueryFn, createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Mutex } from "async-mutex";

import { userSlice } from "@/entities/user";

import { getDeviceInfo } from "./lib";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const mutex = new Mutex();
const baseQuery = fetchBaseQuery({
  baseUrl: API_BASE_URL,
  prepareHeaders: async (headers, { getState }) => {
    const accessToken = (getState() as StoreType).user.accessToken;
    // const s = await getSession();

    if (accessToken) {
      headers.set("Authorization", `Bearer ${accessToken}`);
    }
    return headers;
  },
});

const baseQueryWithReauth: BaseQueryFn = async (args, api, extraOptions) => {
  await mutex.waitForUnlock();
  let result = await baseQuery(args, api, extraOptions);
  if (result.error && result.error.status === 401) {
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();
      const deviceInfo = getDeviceInfo();
      try {
        const refreshRes = await fetch("/api/auth/refresh", {
          method: "POST",
          body: JSON.stringify(deviceInfo),
        });
        const { accessToken } = await refreshRes.json();
        if (refreshRes.ok) {
          await signIn("refresh-token-provider", {
            accessToken,
            redirect: false,
          });
          api.dispatch(userSlice.actions.updateAccessToken(accessToken));
          result = await baseQuery(args, api, extraOptions);
        } else {
          await signOut({ redirect: false });
        }
      } catch (err) {
        console.log("REFRESH ERROR", err);
      } finally {
        release();
      }
    } else {
      await mutex.waitForUnlock();
      result = await baseQuery(args, api, extraOptions);
    }
  }
  return result;
};

export const api = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    testUnauth: builder.query({
      query: () => ({
        url: "http://localhost:3000/api/unauth/",
      }),
    }),
  }),
});
