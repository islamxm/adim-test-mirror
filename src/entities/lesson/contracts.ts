import { z } from "zod";

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

export const Response_GetLessonSuccessSchema = z.object({
  lesson: LessonDetailsSchema,
});
