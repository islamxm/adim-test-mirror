import { UnitSchema } from "@/entities/unit/@x/course";
import { z } from "zod";

export const CourseSchema = z.object({
  id: z.number(),
  name: z.string(),
  icon: z.string(),
  description: z.string(),
  explanation: z.string(),
  languages: z.array(z.string()),
  depth: z.number().optional(),
  isFinished: z.boolean(),
  nextLessonId: z.number().optional(),
  parent_id: z.number().optional(),
  totalLessons: z.number(),
  totalUnits: z.number().optional(),
  units: z.array(UnitSchema).optional(),
});

export const Response_GetCoursesByCategoryIdSuccessSchema = z.object({
  courses: z.array(CourseSchema),
  cursor: z.string().optional()
})
export const Response_GetCourseByIdSuccessSchema = z.object({
  course: CourseSchema
})
