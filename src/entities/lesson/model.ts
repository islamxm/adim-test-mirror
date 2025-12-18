import { z } from "zod";
import {
  LessonDetailsSchema,
  LessonSchema,
  LessonTypeSchema,
} from "./contracts";
import { Nullable } from "@/shared/types";

export type LessonType = z.infer<typeof LessonTypeSchema>;
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
