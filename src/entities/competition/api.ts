import { api } from "@/shared/api";
import { objectToSearchParams } from "@/shared/lib";

import {
  Response_GetCompetitionCategoriesSchema,
  Response_GetMatchDetailsSchema,
  Response_GetMatchesHistorySchema,
  UserMatchStatsSchema,
} from "./contracts";
import {
  Payload_GetMatchDetails,
  Payload_GetMatchesHistory,
  Response_GetMatchDetails,
  Response_GetMatchesHistory,
} from "./model";

export const competitionApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getUserStats: builder.query({
      keepUnusedDataFor: 5,
      query: () => ({
        url: "competition/user/match_stats",
      }),
      transformResponse: (res) => {
        try {
          return UserMatchStatsSchema.parse(res);
        } catch (err) {
          console.log("INVALID API DATA", err);
        }
      },
    }),
    getCompetitionCategories: builder.query({
      query: () => ({
        url: "competition/categories",
      }),
      transformResponse: (res) => {
        try {
          return Response_GetCompetitionCategoriesSchema.parse(res).categories;
        } catch (err) {
          console.log("INVALID API DATA", err);
        }
      },
    }),
    getMatchDetails: builder.query({
      query: ({ id }: Payload_GetMatchDetails) => ({
        url: `competition/match/${id}`,
      }),
      transformResponse: (res) => {
        try {
          return Response_GetMatchDetailsSchema.parse(res);
        } catch (err) {
          console.log("INVALID API DATA", err);
        }
      },
    }),
    getMatchsHistory: builder.infiniteQuery<
      Response_GetMatchesHistory,
      Payload_GetMatchesHistory,
      number
    >({
      keepUnusedDataFor: 10,
      infiniteQueryOptions: {
        initialPageParam: 0,
        getNextPageParam: (lastPage) => {
          return lastPage?.cursor ? Number(lastPage.cursor) : undefined;
        },
      },
      queryFn: async ({ queryArg, pageParam = 0 }, _api, _opts, fetchWithBQ) => {
        const result = await fetchWithBQ({
          url: `competition/user/history${objectToSearchParams({
            ...queryArg,
            cursor: pageParam,
          })}`,
        });
        if (result.error) {
          return { error: result.error };
        }
        try {
          const validated = Response_GetMatchesHistorySchema.parse(result.data);
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

export const COMPETITION_WS_URL = (process.env.NEXT_PUBLIC_API_URL || "") + "competition/ws";
