import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
    prepareHeaders: (headers) => {
      headers.set("Cache-Control", "no-cache");
      return headers
    },
  }),
  endpoints: () => ({})
});
