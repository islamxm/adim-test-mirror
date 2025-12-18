import { z } from "zod";
import { UnitSchema } from "./contracts";
import { Nullable } from "@/shared/types";
import { Lesson } from "@/entities/lesson/@x/unit";

export type UnitDto = z.infer<typeof UnitSchema>;
export type Unit = {
  id: number,
  description: Nullable<string>;
  explanation: Nullable<string>;
  image: Nullable<string>;
  isFinished: boolean;
  languages: Array<any>;
  lessons: Array<Lesson>;
  name: string;
  parentId: number;
  totalLessonsCount: number;
}
