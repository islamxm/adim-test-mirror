import { MatchData } from "@/entities/competition";

export type HistoryMatchData = Pick<MatchData, "id" | "opponent" | "winnerId">;
