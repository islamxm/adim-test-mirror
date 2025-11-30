import { api } from "@/shared/api";

export const homePageApi = api.injectEndpoints({
  endpoints: (build) => ({
    getHomePublicData: build.query({
      query: () => ({
        url: "/home/public"
      })
    })
  })
});