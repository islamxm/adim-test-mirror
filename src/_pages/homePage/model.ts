import { z } from "zod";
import { PublicHomePageDataDtoSchema } from "./contracts";
import { Category } from "@/entities/category";
import { Course } from "@/entities/course";

export type PublicHomePageDataDto = z.infer<typeof PublicHomePageDataDtoSchema>;

export type PublicHomePageData = {
  categories: Array<Category>,
  popularCourses: Array<Course>,
  promotion?: Omit<PublicHomePageData, "course"> & {course: Course}
}