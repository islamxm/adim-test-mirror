import {
  BaseQueryFn,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query";
import { getSession, signOut } from "next-auth/react";
import { Mutex } from "async-mutex";
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const mutex = new Mutex();

const baseQuery = fetchBaseQuery({
  baseUrl: API_BASE_URL,
  prepareHeaders: async (headers) => {
    headers.set("Cache-Control", "no-cache");
    const session = await getSession();
    const accessToken = session?.accessToken;
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
      try {
        const refreshResult = await getSession();
        if (refreshResult?.accessToken) {
          console.log(
            "Token refreshed successfully. Retrying original request..."
          );
          // Если токен успешно обновлен, повторяем исходный запрос
          result = await baseQuery(args, api, extraOptions);
        } else {
          await signOut({ redirect: false });
          window.location.replace("/auth");
        }
      } finally {
        release();
      }
    } else {
      await mutex.waitForUnlock();
      result = await baseQuery(args, api, extraOptions);
    }
  }
  return result
};

export const api = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
});

// export const authInstance = betterAuth({
//   socialProviders: {
//     google: {
//       clientId: process.env.GOOGLE_CLIENT_ID || "",
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET || ""
//     },
//   },
// })

// export const authClient = createAuthClient()
