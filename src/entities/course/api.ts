import { api } from "@/shared/api";
import { objectToSearchParams } from "@/shared/lib";
import { CourseSchema, Response_GetCoursesByCategoryIdSuccessSchema, Response_GetCourseByIdSuccessSchema } from "./contract";
import { courseDtoMap } from "./lib";
import {z} from "zod";

type GetCoursesByCategoryIdInputType = {
  categoryId?: string;
  cursor?: number;
};

export const courseApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getCoursesByCategoryId: builder.infiniteQuery<
      z.infer<typeof Response_GetCoursesByCategoryIdSuccessSchema>,
      GetCoursesByCategoryIdInputType,
      number
    >({
      infiniteQueryOptions: {
        initialPageParam: 0,
        getNextPageParam(lastPage) {
          return lastPage?.cursor ? Number(lastPage.cursor) : undefined;
        },
      },
      queryFn: async (
        { queryArg, pageParam = 0 },
        _api,
        _opts,
        fetchWithBQ
      ) => {
        const result = await fetchWithBQ({
          url: `home/category_courses${objectToSearchParams({
            ...queryArg,
            cursor: pageParam,
          })}`,
        });
        if (result.error) {
          return { error: result.error };
        }
        try {
          const validated = Response_GetCoursesByCategoryIdSuccessSchema.parse(
            result.data
          );
          return {
            data: {
              ...validated,
              courses: validated.courses.map(courseDtoMap),
            },
          };
        } catch (err) {
          console.log("VALIDATE ERROR", err);
          return {
            error: {
              status: 500,
              data: `Invalid response format: ${err}`,
            },
          };
        }
      },
    }),
    getCourseById: builder.query({
      query: (id: number) => ({
        url: `courses/course_info${objectToSearchParams({id})}`,
      }),
      transformResponse: (res) => {
        try {
          return courseDtoMap(Response_GetCourseByIdSuccessSchema.parse(res).course)
        } catch(err) {
          console.log("VALIDATE ERROR", err);
        }
      }
    })
  }),
});
