import { ContinueCourse, ContinueCourseDto, Course, CourseDto } from "./model";

export const courseDtoMap = (courseDto: CourseDto): Course => {
  return {
    id: courseDto.id,
    name: courseDto.name,
    image: courseDto.icon,
    description: courseDto.description,
    explanation: courseDto.explanation,
    languages: courseDto.languages,
    isFinished: courseDto.isFinished,
    units: courseDto.units || [],
    totalLessonsCount: courseDto.totalLessons,
  };
};

export const continueCourseDtoMap = (courseDto: ContinueCourseDto): ContinueCourse => {
  return courseDto;
};
