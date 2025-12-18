import { z } from "zod";
import { UserMatchStatsSchema } from "./contracts";

export const CnServerEventSchema = z.object({
  IN_QUEUE: z.object({
    roomCode: z.string(),
    serverTimeUnixMilli: z.number(),
  }),
  OPPONENT_FOUND: z.object({
    opponentId: z.number(),
    roomCode: z.string(),
    matchId: z.number(),
  }),
  CANCELLED: z.object({
    code: z.number(),
    message: z.string(),
  }),
  ERROR: z.object({
    code: z.number(),
    message: z.string(),
  }),
});

export const CnClientEventSchema = z.object({
  ENTER_QUEUE: z.object({ subCategoryId: z.number() }),
});

export type CnServerEventName = keyof z.infer<
  typeof CnServerEventSchema
>;
export type CnClientEventName = keyof z.infer<
  typeof CnClientEventSchema
>;
export type CnEventName =
  | CnServerEventName
  | CnClientEventName;

export type CnClientEventsMap = z.infer<typeof CnClientEventSchema>;
export type CnServerEventsMap = z.infer<typeof CnServerEventSchema>;
export type EventsMap = CnClientEventsMap & CnServerEventsMap;

export const CnServerMessageSchema = z.object({
  event: CnServerEventSchema.keyof(),
  data: z.unknown()
})

export type UserMatchStatsDto = z.infer<typeof UserMatchStatsSchema>;
export type UserMatchStats = UserMatchStatsDto