import { signIn, signOut } from "next-auth/react";

import { BaseQueryFn, createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Mutex } from "async-mutex";

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
        const refreshRes = await fetch(`${API_BASE_URL}users/generate_token`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            deviceInfo,
            token: (api.getState() as StoreType).user.refreshToken,
          }),
        });
        const { accessToken, refreshToken } = await refreshRes.json();
        if (refreshRes.ok) {
          api.dispatch({
            type: "user/updateTokens",
            payload: { accessToken, refreshToken },
          });

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
  endpoints: () => ({}),
});
