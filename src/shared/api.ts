import { getSession, signOut } from "next-auth/react";

import { BaseQueryFn, createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Mutex } from "async-mutex";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const mutex = new Mutex();
const baseQuery = fetchBaseQuery({
  baseUrl: API_BASE_URL,
  prepareHeaders: async (headers, { getState }) => {
    let accessToken = (getState() as StoreType).user.accessToken;
    if (!accessToken) {
      const session = await getSession();
      accessToken = session?.accessToken || "";
    }
    headers.set("Authorization", `Bearer ${accessToken}`);
    return headers;
  },
});

const baseQueryWithReauth: BaseQueryFn = async (args, api, extraOptions) => {
  await mutex.waitForUnlock();
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    const currentAccessToken = (api.getState() as StoreType).user.accessToken;
    const session = await getSession();
    if (session?.accessToken && session?.accessToken !== currentAccessToken) {
      const newHeaders = new Headers(args.headers || {});
      newHeaders.set("Authorization", `Bearer ${session.accessToken}`);
      result = await baseQuery({ ...args, headers: newHeaders }, api, extraOptions);
    } else {
      signOut({ redirect: false });
    }
  }
  return result;
};

export const api = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
});
