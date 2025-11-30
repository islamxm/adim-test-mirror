import { z } from "zod";

export const CourseSchema = z.object({
  depth: z.number(),
  description: z.string(),
  explanation: z.string(),
  icon: z.string(),
  id: z.number(),
  isFinished: z.boolean(),
  languages: z.array(z.string()),
  // LessonSchema or Omitted LessonSchema
  lessons: z.unknown(),
  name: z.string(),
  nextLessonId: z.number(),
  parent_id: z.number(),
  totalLessons: z.number(),
  totalUnits: z.number(),
  // UnitSchema or Omitted UnitSchema
  units: z.unknown(),
});
