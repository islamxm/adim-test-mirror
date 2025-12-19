import { z } from "zod";
import {
  CommentSchema,
  LessonDetailsSchema,
  LessonSchema,
  LessonTypeSchema,
  Response_GetLessonCommentsSchema,
} from "./contracts";
import { Nullable } from "@/shared/types";

export type LessonType = z.infer<typeof LessonTypeSchema>;
export type LessonDto = z.infer<typeof LessonSchema>;
export type LessonDetailsDto = z.infer<typeof LessonDetailsSchema>;
export type Lesson = {
  id: number;
  isFinished: boolean;
  name: string;
  type: LessonType;
  unitId: number;
};
export type LessonDetails = {
  blog: Nullable<string>;
  commentCount: number;
  durationMinutes: number;
  id: number;
  isFinished: boolean;
  name: string;
  nextLessonId: Nullable<number> | undefined;
  type: LessonType;
  video: any;
};

export type CommentDto = z.infer<typeof CommentSchema>;
export type Comment = {
  userName: Nullable<string>;
  id: number;
  createdAt: string;
  isOwn: boolean;
  hasReplies: boolean;
  text: string;
  userAvatar?: string;
};
export type Params_GetLessonComments = {
  lessonId: number;
  cursor?: string;
  limit?: number
  direction?: "asc" | "desc";
}
export type API_ResponseGetLessonComments = z.infer<typeof Response_GetLessonCommentsSchema>;