import { JSX, ReactNode } from "react";
import { BronzeIcon, GoldIcon, SilverIcon } from "./icons";

export type League =
  | "BRONZE"
  | "SILVER"
  | "GOLD"
  // | "SAPHIRE"
  // | "RUBY"
  // | "EMERALD";
export type Rating = "local" | "global";

export const leagueMap: Record<League, { label: string; icon: ReactNode }> = {
  BRONZE: { label: "Bronze", icon: <BronzeIcon sx={{fontSize: "2.4rem"}}/> },
  SILVER: { label: "Silver", icon: <SilverIcon sx={{fontSize: "2.4rem"}}/> },
  GOLD: { label: "Gold", icon: <GoldIcon sx={{fontSize: "2.4rem"}}/> },
};
