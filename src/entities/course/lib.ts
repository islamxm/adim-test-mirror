import { Course, CourseDto } from "./model";

export const courseDtoMap = (courseDto: CourseDto): Course => {
  const { parent_id, ...pureCourseDto } = courseDto;
  return {
    ...pureCourseDto,
    parentId: parent_id,
  };
};
