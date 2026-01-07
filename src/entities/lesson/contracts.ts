import { z } from "zod";
import { UserSchema } from "@/entities/user/@x/lesson";

export const LessonTypeSchema = z.literal(["BLOG", "VIDEO"]);

export const LessonSchema = z.object({
  id: z.number(),
  isFinished: z.boolean(),
  name: z.string(),
  type: LessonTypeSchema,
  commentCount: z.number(),
  duration_minutes: z.number(),
  unit_id: z.number(),
});

export const LessonDetailsSchema = z.object({
  blog: z.string().nullable().optional(),
  commentCount: z.number(),
  duration_minutes: z.number(),
  id: z.number(),
  isFinished: z.boolean(),
  name: z.string(),
  nextLessonId: z.number().nullable().optional(),
  type: LessonTypeSchema,
  unit_id: z.number(),
  video: z.any(),
});

export const Response_GetLessonSchema = z.object({
  lesson: LessonDetailsSchema,
});

export const CommentSchema = z.object({
  IsEdited: z.boolean().optional(),
  createdAt: z.string(),
  id: z.number(),
  isOwn: z.boolean(),
  lessonId: z.number(),
  parent_id: z.number().optional(),
  replies: z.array(z.any()).optional(),
  text: z.string(),
  user: UserSchema,
})

export const Response_GetLessonCommentsSchema = z.object({
  comments: z.array(CommentSchema).nullable(),
  cursor: z.string()
})

export const Response_CreateCommentSchema = z.object({
  comment: CommentSchema
})