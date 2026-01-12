import { z } from "zod";
import { UserSchema } from "@/entities/user/@x/competition";

export const CompetitionCategorySchema = z.object({
  iconPath: z.string().nullable(),
  id: z.number(),
  name: z.string(),
  subCategories: z.array(z.any()).nullable(),
});
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

export const Response_GetLeaderboardSchema = z.object({
  board: z.array(
    z.object({
      points: z.number(),
      rank: z.number(),
      user: UserSchema,
    })
  ),
  cursor: z.string(),
});
export const Response_GetMatchesHistorySchema = z.object({
  cursor: z.string(),
  history: z.array(
    z.object({
      id: z.number(),
      player1Id: z.number(),
      player2Id: z.number(),
      startedAt: z.string(),
      winnerId: z.number(),
      opponent: UserSchema,
    })
  ),
});
export const Response_GetCompetitionCategoriesSchema = z.object({
  categories: z.array(CompetitionCategorySchema),
});

export const Payload_GetLeaderboardSchema = z.object({
  cursor: z.string(),
  direction: z.string(),
  limit: z.number(),
});
export const Payload_GetMatchesHistorySchema = z.object({
  cursor: z.string(),
  direction: z.string(),
  limit: z.number(),
});


