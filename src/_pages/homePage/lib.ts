import { categoryDtoMap } from "@/entities/category";
import { courseDtoMap } from "@/entities/course";

import { PublicHomePageDataDto } from "./model";

export const publicHomePageDataDtoMap = (dto: PublicHomePageDataDto) => {
  return {
    categories: dto.categories.map(categoryDtoMap),
    popularCourses: dto.popularCourses.map(courseDtoMap),
    promotion: dto.promotion
      ? {
          ...dto.promotion,
          course: courseDtoMap(dto.promotion.course),
        }
      : undefined,
  };
};
