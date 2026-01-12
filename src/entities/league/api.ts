import { api } from "@/shared/api";
import { objectToSearchParams } from "@/shared/lib";

import { Response_GetLeaderboardSchema } from "./contracts";
import { Payload_GetLeaderboard, Response_GetLeaderboard } from "./model";

export const leagueApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getLeaderboard: builder.infiniteQuery<Response_GetLeaderboard, Payload_GetLeaderboard, number>({
      infiniteQueryOptions: {
        initialPageParam: 0,
        getNextPageParam: (lastPage) => {
          return lastPage?.cursor ? Number(lastPage.cursor) : undefined;
        },
      },
      queryFn: async ({ queryArg, pageParam = 0 }, _api, _opts, fetchWithBQ) => {
        const result = await fetchWithBQ({
          url: `competition/leaderboard${objectToSearchParams({
            ...queryArg,
            cursor: pageParam,
          })}`,
        });
        if (result.error) {
          return { error: result.error };
        }
        try {
          const validated = Response_GetLeaderboardSchema.parse(result.data);
          return {
            data: validated,
          };
        } catch (err) {
          console.log("VALIDATE ERROR", err);
          return {
            error: {
              status: 500,
              data: `Invalid response format: ${err}`,
            },
          };
        }
      },
    }),
  }),
});
