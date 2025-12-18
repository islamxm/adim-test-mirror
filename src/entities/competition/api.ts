import { api } from "@/shared/api";
import { UserMatchStatsSchema } from "./contracts";

export const competitionApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getUserStats: builder.query({
      query: () => ({
        url: "competition/user/match_stats"
      }),
      transformResponse: (res) => {
        try {
          return UserMatchStatsSchema.parse(res)
        } catch(err) {
          console.log("INVALID API DATA", err)
        }
      }
    })
  }),
});
