import { z } from "zod";

import { UserSchema } from "@/entities/user/@x/league";

export const LeaderBoardUserSchema = z.object({
  points: z.number(),
  rank: z.number(),
  user: UserSchema,
});

export const Response_GetLeaderboardSchema = z.object({
  board: z.array(LeaderBoardUserSchema),
  cursor: z.string(),
});
