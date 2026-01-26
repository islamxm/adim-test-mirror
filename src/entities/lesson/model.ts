import { z } from "zod";

import { Nullable } from "@/shared/types";

import {
  CommentSchema,
  LessonDetailsSchema,
  LessonSchema,
  LessonTypeSchema,
  Response_CreateCommentSchema,
} from "./contracts";

export type LessonType = z.infer<typeof LessonTypeSchema>;
export type CommentStatus = "loading" | "success" | "error";

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
  status?: CommentStatus;
};

export type Response_GetLessonComments = {
  cursor: string;
  comments: Array<Comment>;
};
export type Response_CreateComment = z.infer<typeof Response_CreateCommentSchema>;

export type Payload_GetLessonComments = {
  lessonId: number;
  cursor?: string;
  limit?: number;
  direction?: "asc" | "desc";
};
export type Payload_GetLessonCommentReplies = {
  lessonId: number;
  commentId: number;
  cursor?: string;
  limit?: number;
  direction?: "asc" | "desc";
};
export type Payload_CreateComment = {
  lessonId: number;
  text: string;
};
export type Payload_ReplyComment = {
  lessonId: number;
  parentId: number;
  text: string;
};
export type Payload_FinishLesson = {
  courseId: number;
  lessonId: number;
};
