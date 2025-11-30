import { z } from "zod";
import { CourseSchema } from "./contract";

export type CourseDto = z.infer<typeof CourseSchema>;
export type Course = Omit<CourseDto, "parent_id"> & {
  parentId: number;
};
