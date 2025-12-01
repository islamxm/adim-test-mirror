import { api } from "@/shared/api";
import { PublicHomePageDataSuccessSchema } from "./contracts";
import { categoryDtoMap } from "@/entities/category";
import { courseDtoMap } from "@/entities/course/lib";

export const homePageApi = api.injectEndpoints({
  endpoints: (build) => ({
    getHomePublicData: build.query({
      query: () => ({
        url: "/home/public?lang=tk",
      }),
      transformResponse: (res: any) => {
        try {
          const validated = PublicHomePageDataSuccessSchema.parse(res);
          return {
            ...validated,
            categories: validated.categories.map(categoryDtoMap),
            popularCourses: validated.popularCourses.map(courseDtoMap),
          }
        } catch (err) {
          console.error("INVALID RESPONSE")
        }
      },
    }),
  }),
});
