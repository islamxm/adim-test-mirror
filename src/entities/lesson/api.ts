import { api } from "@/shared/api";
import { Response_GetLessonSuccessSchema } from "./contracts";
import { objectToSearchParams } from "@/shared/lib";
import { lessonDetailsDtoMap } from "./lib";

export const lessonApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getLesson: builder.query({
      query: (id: number) => ({
        url: `courses/lesson_info` + objectToSearchParams({id})
      }),
      transformResponse: (res) => {
        try {
          return lessonDetailsDtoMap(Response_GetLessonSuccessSchema.parse(res).lesson)
        } catch(err) {
          console.log("INVALID API DATA", err);
        }
      }
    })
  })
})