import { z } from "zod";

export const CourseSchema = z.object({
  depth: z.number().optional(),
  description: z.string(),
  explanation: z.string(),
  icon: z.string(),
  id: z.number(),
  isFinished: z.boolean(),
  languages: z.array(z.string()),
  // LessonSchema or Omitted LessonSchema
  lessons: z.unknown().optional(),
  name: z.string(),
  nextLessonId: z.number().optional(),
  parent_id: z.number().optional(),
  totalLessons: z.number(),
  totalUnits: z.number().optional(),
  // UnitSchema or Omitted UnitSchema
  units: z.unknown().optional(),
});
