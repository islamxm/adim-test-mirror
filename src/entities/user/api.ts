import { api } from "@/shared/api";

export const userApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getHomeUserData: builder.query({
      query: () => ({
        url: "home/private",
      }),
    })
  })
})