import { lessonDtoMap } from "@/entities/lesson/@x/unit";

import { Unit, UnitDto } from "./model";

export const unitDtoMap = (unitDto: UnitDto): Unit => {
  return {
    id: unitDto.id,
    description: unitDto.description,
    explanation: unitDto.explanation,
    image: unitDto.icon,
    isFinished: unitDto.isFinished,
    languages: unitDto.languages,
    lessons: unitDto.lessons.map(lessonDtoMap),
    name: unitDto.name,
    parentId: unitDto.parent_id,
    totalLessonsCount: unitDto.totalLessons,
  };
};
