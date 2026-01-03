import { ReactNode } from "react";
import { BronzeIcon, GoldIcon, SilverIcon } from "./icons";
import { z } from "zod";
import { LeaderBoardUserSchema, Response_GetLeaderboardSchema } from "./contracts";

export type League = "BRONZE" | "SILVER" | "GOLD";
export type Rating = "local" | "global";

export const leagueMap: Record<League, { label: string; icon: ReactNode }> = {
  BRONZE: { label: "Bronze", icon: <BronzeIcon sx={{ fontSize: "2.4rem" }} /> },
  SILVER: { label: "Silver", icon: <SilverIcon sx={{ fontSize: "2.4rem" }} /> },
  GOLD: { label: "Gold", icon: <GoldIcon sx={{ fontSize: "2.4rem" }} /> },
};

export type Response_GetLeaderboard = z.infer<
  typeof Response_GetLeaderboardSchema
>;
export type GetLeaderboardInputType = {
  cursor?: number;
}
export type LeaderBoardUser = z.infer<typeof LeaderBoardUserSchema>;