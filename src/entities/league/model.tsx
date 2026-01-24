import { ReactNode } from "react";

import { z } from "zod";

import { LeaderBoardUserSchema, Response_GetLeaderboardSchema } from "./contracts";
import { BronzeIcon, GoldIcon, NoLeagueIcon, SilverIcon } from "./icons";

export type League = "BRONZE" | "SILVER" | "GOLD" | "NO_LEAGUE";
export type LeaderBoardUserDto = z.infer<typeof LeaderBoardUserSchema>;
export type LeaderBoardUser = LeaderBoardUserDto;

export type Response_GetLeaderboard = z.infer<typeof Response_GetLeaderboardSchema>;

export type Payload_GetLeaderboard = {
  cursor?: number;
  leagueName?: League;
};

export const leagueMap: Record<League, { label: string; icon: ReactNode }> = {
  NO_LEAGUE: { label: "No league", icon: <NoLeagueIcon sx={{ fontSize: "2.4rem" }} /> },
  BRONZE: { label: "Bronze", icon: <BronzeIcon sx={{ fontSize: "2.4rem" }} /> },
  SILVER: { label: "Silver", icon: <SilverIcon sx={{ fontSize: "2.4rem" }} /> },
  GOLD: { label: "Gold", icon: <GoldIcon sx={{ fontSize: "2.4rem" }} /> },
};
