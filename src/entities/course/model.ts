import { z } from "zod";
import {
  CourseSchema,
  Response_GetCourseByIdSuccessSchema,
  Response_GetCoursesByCategoryIdSuccessSchema,
} from "./contract";
import { DefaultResponseErrorData, Nullable, Response } from "@/shared/types";

export type CourseCardChipInfo = "category" | "language" | "lessons_count";

export type CourseDto = z.infer<typeof CourseSchema>;
export type Course = {
  id: number;
  name: string;
  image: Nullable<string>;
  description: Nullable<string>;
  explanation: Nullable<string>;
  languages: Array<string>;
  isFinished: boolean;
  // lessons: Array<any> | undefined;
  totalLessonsCount: number;
  units: Array<any>;
  // parentId: number;
};

export type Response_GetCoursesByCategoryId = Response<
  z.infer<typeof Response_GetCoursesByCategoryIdSuccessSchema>,
  DefaultResponseErrorData
>;
export type Response_GetCourseById = Response<
  z.infer<typeof Response_GetCourseByIdSuccessSchema>,
  DefaultResponseErrorData
>;

export const COURSE_TABS = {
  comments: "comments",
  units: "units",
};
