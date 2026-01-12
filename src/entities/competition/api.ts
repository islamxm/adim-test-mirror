import { api } from "@/shared/api";
import {
  Response_GetCompetitionCategoriesSchema,
  UserMatchStatsSchema,
} from "./contracts";

export const competitionApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getUserStats: builder.query({
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
    // getMatchesHistory: builder
  }),
});

export const COMPETITION_WS_URL =
  (process.env.NEXT_PUBLIC_API_URL || "") + "competition/ws";
