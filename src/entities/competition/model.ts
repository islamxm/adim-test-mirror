import { z } from "zod";

import { UserSchema } from "@/entities/user/@x/competition";

import {
  CompetitionCategorySchema,
  Payload_GetMatchDetailsSchema,
  Payload_GetMatchesHistorySchema,
  QuestionSchema,
  Response_GetMatchDetailsSchema,
  Response_GetMatchesHistorySchema,
  UserMatchStatsSchema,
} from "./contracts";

const EventIdSchema = z.string();

export const PlayerSchema = UserSchema.omit({
  backupEmail: true,
  birthday: true,
  phone: true,
});

export const AnswerSchema = z.object({
  answer: z.string().optional(),
  elapsedMs: z.number(),
  isCorrect: z.boolean(),
  matchId: z.number(),
  /**@deprecated */
  question: QuestionSchema.optional(),
  questionOrder: z.number(),
  userId: z.number(),
  stem: z.string().optional(),
});

export const CnServerEventSchema = z.object({
  IN_QUEUE: z.object({
    roomCode: z.string(),
    serverTimeUnixMilli: z.number(),
    eventId: EventIdSchema,
  }),
  OPPONENT_FOUND: z.object({
    opponentId: PlayerSchema,
    roomCode: z.string(),
    matchId: z.number(),
    sessionTimeoutSec: z.number(),
    winPoints: z.number(),
    lossPoints: z.number(),
    eventId: EventIdSchema,
  }),
  COMPETE_AWAIT: z.any(),
  START: z.object({
    questionOrder: z.number(),
    countdownSec: z.number(),
    totalQuestionCount: z.number(),
    question: QuestionSchema,
    eventId: EventIdSchema,
  }),
  NEXT_QUESTION: z.object({
    questionOrder: z.number(),
    totalQuestionCount: z.number(),
    question: QuestionSchema,
    eventId: EventIdSchema,
  }),
  WAIT_RESULT: z.object({
    answers: z.array(AnswerSchema),
    eventId: EventIdSchema,
  }),
  RESULT: z.object({
    winnerId: z.number().nullable(),
    answers: z.array(AnswerSchema),
    opponentAnswers: z.array(AnswerSchema),
    eventId: EventIdSchema,
  }),
  OPPONENT_READY: z.object({
    opponentId: z.number(),
  }),
  CANCELLED: z.object({
    code: z.number(),
    message: z.string(),
  }),
  OPPONENT_REJECTED: z.object({
    subCategoryId: z.number(),
  }),
  ERROR: z.object({
    code: z.number(),
    message: z.string(),
  }),
  ACKNOWLEDGE: z.object({
    eventId: EventIdSchema,
  }),
});

export const CnClientEventSchema = z.object({
  ENTER_QUEUE: z.object({ subCategoryId: z.number(), eventId: EventIdSchema }),
  COMPETE: z.object({ roomCode: z.string(), eventId: EventIdSchema }),
  SUBMIT_ANSWER: z.object({
    roomCode: z.string(),
    matchId: z.number(),
    questionOrder: z.number(),
    answer: z.string(),
    elapsedMs: z.number(),
    eventId: EventIdSchema,
  }),
  NEXT_OPPONENT: z.object({
    roomCode: z.string(),
    subCategoryId: z.number(),
    eventId: EventIdSchema,
  }),
});

export type CnServerEventName = keyof z.infer<typeof CnServerEventSchema>;
export type CnClientEventName = keyof z.infer<typeof CnClientEventSchema>;
export type CnEventName = CnServerEventName | CnClientEventName;

export type CnClientEventsMap = z.infer<typeof CnClientEventSchema>;
export type CnServerEventsMap = z.infer<typeof CnServerEventSchema>;
export type EventsMap = CnClientEventsMap & CnServerEventsMap;

export const CnServerMessageSchema = z.object({
  event: CnServerEventSchema.keyof(),
  data: z.unknown(),
});

export type UserMatchStatsDto = z.infer<typeof UserMatchStatsSchema>;
export type UserMatchStats = UserMatchStatsDto;

export type CompetitionCategoryDto = z.infer<typeof CompetitionCategorySchema>;
export type CompetitionCategory = CompetitionCategoryDto;
export type PlayerDto = z.infer<typeof PlayerSchema>;
export type Player = PlayerDto;

export type QuestionDto = z.infer<typeof QuestionSchema>;
export type Question = QuestionDto;

export type AnswerDto = z.infer<typeof AnswerSchema>;
export type Answer = AnswerDto;

export type PlayerStatusType = "WAIT" | "READY" | "NETWORK_ERROR" | GameResult;
export type GameResult = "WIN" | "LOSE" | "DRAW";

export type Payload_GetMatchesHistory = z.infer<typeof Payload_GetMatchesHistorySchema>;
export type Response_GetMatchesHistory = z.infer<typeof Response_GetMatchesHistorySchema>;
export type MatchData = Response_GetMatchesHistory["history"][0];

export type Response_GetMatchDetails = z.infer<typeof Response_GetMatchDetailsSchema>;
export type Payload_GetMatchDetails = z.infer<typeof Payload_GetMatchDetailsSchema>;
