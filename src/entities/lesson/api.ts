import { api } from "@/shared/api";
import { Response_GetLessonCommentsSchema, Response_GetLessonSchema } from "./contracts";
import { objectToSearchParams } from "@/shared/lib";
import { commentDtoMap, lessonDetailsDtoMap } from "./lib";
import {
  API_ResponseGetLessonComments,
  Params_GetLessonComments,
} from "./model";

export const lessonApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getLesson: builder.query({
      query: (id: number) => ({
        url: `courses/lesson_info` + objectToSearchParams({ id }),
      }),
      transformResponse: (res) => {
        try {
          return lessonDetailsDtoMap(
            Response_GetLessonSchema.parse(res).lesson
          );
        } catch (err) {
          console.log("INVALID API DATA", err);
        }
      },
    }),
    getLessonComments: builder.infiniteQuery<
      any,
      Params_GetLessonComments,
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
          url:
            "courses/lesson/comments" +
            objectToSearchParams({ ...queryArg, cursor: pageParam }),
        });
        if(result.error) {
          return {error: result.error}
        }
        try {
          const validated = Response_GetLessonCommentsSchema.parse(result.data);
          return {
            data: {
              ...validated,
              comments: validated.comments.map(commentDtoMap)
            }
          }
        } catch(err) {
          console.log(err)
          return {
            error: {
              status: 500,
              data: `[api data validation]: ${err}`
            }
          }
        }
      },
    }),
  }),
});
