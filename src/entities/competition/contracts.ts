import { z } from "zod";

export const UserMatchStatsSchema = z.object({
  canceledCount: z.number(),
  draws: z.number(),
  lastMatchAt: z.string(),
  leagueId: z.number(),
  leagueName: z.string(),
  leagueRank: z.number(),
  losses: z.number(),
  totalMatches: z.number(),
  totalPoints: z.number(),
  wins: z.number(),
});
