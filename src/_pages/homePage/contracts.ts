import { z } from "zod";

import { CategorySchema } from "@/entities/category";
import { CourseSchema } from "@/entities/course";

export const PublicHomePageDataDtoSchema = z.object({
  categories: z.array(CategorySchema),
  popularCourses: z.array(CourseSchema),
  promotion: z
    .object({
      course: CourseSchema,
      destId: z.number(),
      destType: z.string(),
      destUrl: z.string(),
      id: z.number(),
      locale: z.string(),
      placement: z.string(),
      platform: z.string(),
    })
    .optional(),
});
