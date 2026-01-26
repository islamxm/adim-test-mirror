import { api } from "@/shared/api";
import { objectToSearchParams } from "@/shared/lib";

import { User } from "@/entities/user/@x/lesson";

import { Response_GetLessonCommentsSchema, Response_GetLessonSchema } from "./contracts";
import { commentDtoMap, lessonDetailsDtoMap } from "./lib";
import {
  Comment,
  Payload_CreateComment,
  Payload_FinishLesson,
  Payload_GetLessonCommentReplies,
  Payload_GetLessonComments,
  Payload_ReplyComment,
  Response_CreateComment,
  Response_GetLessonComments,
} from "./model";

export const lessonApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getLesson: builder.query({
      query: (id: number) => ({
        url: `courses/lesson_info` + objectToSearchParams({ id }),
      }),
      transformResponse: (res) => {
        try {
          return lessonDetailsDtoMap(Response_GetLessonSchema.parse(res).lesson);
        } catch (err) {
          console.log("INVALID API DATA", err);
        }
      },
    }),

    getLessonComments: builder.infiniteQuery<
      Response_GetLessonComments,
      Payload_GetLessonComments,
      number
    >({
      infiniteQueryOptions: {
        initialPageParam: 0,
        getNextPageParam(lastPage) {
          return lastPage?.cursor ? Number(lastPage.cursor) : undefined;
        },
      },
      queryFn: async ({ queryArg, pageParam = 0 }, _api, _opts, fetchWithBQ) => {
        const result = await fetchWithBQ({
          url: "courses/lesson/comments" + objectToSearchParams({ ...queryArg, cursor: pageParam }),
        });
        if (result.error) {
          return { error: result.error };
        }
        try {
          const validated = Response_GetLessonCommentsSchema.parse(result.data);
          return {
            data: {
              ...validated,
              comments: validated.comments ? validated.comments.map(commentDtoMap) : [],
            },
          };
        } catch (err) {
          console.log(err);
          return {
            error: {
              status: 500,
              data: `[api data validation]: ${err}`,
            },
          };
        }
      },
    }),

    getLessonCommentReplies: builder.infiniteQuery<
      Response_GetLessonComments,
      Payload_GetLessonCommentReplies,
      number
    >({
      infiniteQueryOptions: {
        initialPageParam: 0,
        getNextPageParam(lastPage) {
          return lastPage?.cursor ? Number(lastPage.cursor) : undefined;
        },
      },
      queryFn: async ({ queryArg, pageParam = 0 }, _api, _opts, fetchWithBQ) => {
        const result = await fetchWithBQ({
          url:
            "courses/lesson/comment/replies" +
            objectToSearchParams({ ...queryArg, cursor: pageParam }),
        });
        if (result.error) {
          return { error: result.error };
        }
        try {
          const validated = Response_GetLessonCommentsSchema.parse(result.data);
          return {
            data: {
              ...validated,
              comments: validated.comments ? validated.comments.map(commentDtoMap) : [],
            },
          };
        } catch (err) {
          console.log(err);
          return {
            error: {
              status: 500,
              data: `[api data validation]: ${err}`,
            },
          };
        }
      },
    }),

    createComment: builder.mutation<Response_CreateComment, Payload_CreateComment & { user: User }>(
      {
        query: ({ lessonId, text }) => ({
          // url: "",
          url: "courses/lesson/comment",
          body: JSON.stringify({ lessonId, text }),
          method: "POST",
        }),
        async onQueryStarted(queryArgument, { dispatch, queryFulfilled }) {
          const newComment: Comment = {
            userName: queryArgument.user.profileName,
            createdAt: new Date().toISOString(),
            isOwn: true,
            text: queryArgument.text,
            userAvatar: queryArgument.user.avatarUrl,
            status: "loading",
            id: Date.now(),
            hasReplies: false,
          };

          const optimisticCreate = dispatch(
            lessonApi.util.updateQueryData(
              "getLessonComments",
              { lessonId: queryArgument.lessonId, limit: 20 },
              (draft) => {
                if (!draft.pages?.[0]) {
                  return;
                }
                draft.pages[0].comments?.unshift(newComment);
              },
            ),
          );

          try {
            const { data } = await queryFulfilled;
            dispatch(
              lessonApi.util.updateQueryData(
                "getLessonComments",
                { lessonId: queryArgument.lessonId, limit: 20 },
                (draft) => {
                  const idx = draft.pages[0].comments.findIndex(
                    (comment) => comment.id === newComment.id,
                  );
                  if (idx !== -1) {
                    draft.pages[0].comments[idx] = {
                      ...commentDtoMap(data.comment),
                      status: "success",
                    };
                  }
                },
              ),
            );
          } catch {
            optimisticCreate.undo();
          }
        },
      },
    ),

    createReplyComment: builder.mutation<
      Response_CreateComment,
      Payload_ReplyComment & { user: User }
    >({
      query: ({ parentId, lessonId, text }) => ({
        url: "courses/lesson/comment/reply",
        method: "POST",
        body: { parentId, lessonId, text },
      }),
      async onQueryStarted(queryArgument, { dispatch, queryFulfilled }) {
        const newComment: Comment = {
          userName: queryArgument.user.profileName,
          createdAt: new Date().toISOString(),
          isOwn: true,
          hasReplies: false,
          text: queryArgument.text,
          userAvatar: queryArgument.user.avatarUrl,
          status: "loading",
          id: Date.now(),
        };

        const optimisticCreate = dispatch(
          lessonApi.util.updateQueryData(
            "getLessonCommentReplies",
            {
              lessonId: queryArgument.lessonId,
              limit: 20,
              commentId: queryArgument.parentId,
            },
            (draft) => {
              if (!draft.pages?.[0]) {
                return;
              }
              draft.pages[0].comments?.unshift(newComment);
            },
          ),
        );

        try {
          const { data } = await queryFulfilled;
          dispatch(
            lessonApi.util.updateQueryData(
              "getLessonCommentReplies",
              {
                lessonId: queryArgument.lessonId,
                limit: 20,
                commentId: queryArgument.parentId,
              },
              (draft) => {
                const idx = draft.pages[0].comments.findIndex(
                  (comment) => comment.id === newComment.id,
                );
                if (idx !== -1) {
                  draft.pages[0].comments[idx] = {
                    ...commentDtoMap(data.comment),
                    status: "success",
                  };
                }
              },
            ),
          );
        } catch {
          optimisticCreate.undo();
        }
      },
    }),

    // deleteComment: builder.mutation({
    //   query: ({
    //     id,
    //   }: {
    //     id: number;
    //     lessonId: number;
    //     commentId?: number;
    //   }) => ({
    //     url: "courses/lesson/comment" + objectToSearchParams({ id }),
    //     method: "DELETE",
    //   }),
    //   async onQueryStarted(queryArgument, { dispatch, queryFulfilled }) {
    //     const optimisticDelete = dispatch(
    //       lessonApi.util.updateQueryData(
    //         queryArgument.commentId
    //           ? "getLessonCommentReplies"
    //           : "getLessonComments",
    //         queryArgument.commentId
    //           ? {
    //               lessonId: queryArgument.lessonId,
    //               limit: 20,
    //               commentId: queryArgument.commentId,
    //             }
    //           : { lessonId: queryArgument.lessonId, limit: 20 },
    //         (draft) => {
    //           const pageIdx = draft.pages.findIndex((page) =>
    //             Boolean(page.comments.find((c) => c.id === queryArgument.id))
    //           );
    //           if (pageIdx !== -1) {
    //             draft.pages[pageIdx].comments = draft.pages[
    //               pageIdx
    //             ].comments.filter((c) => c.id === queryArgument.id);
    //           }
    //         }
    //       )
    //     );

    //     try {
    //       const { data } = await queryFulfilled;
    //       dispatch(
    //         lessonApi.util.updateQueryData(
    //           queryArgument.commentId
    //             ? "getLessonCommentReplies"
    //             : "getLessonComments",
    //           queryArgument.commentId
    //             ? {
    //                 lessonId: queryArgument.lessonId,
    //                 limit: 20,
    //                 commentId: queryArgument.commentId,
    //               }
    //             : { lessonId: queryArgument.lessonId, limit: 20 },
    //           (draft) => {

    //           }
    //         )
    //       );
    //     } catch {
    //       optimisticCreate.undo();
    //     }
    //   },
    // }),

    finishLesson: builder.mutation<any, Payload_FinishLesson, any>({
      query: (body) => ({
        url: "courses/report_lesson_finished",
        method: "POST",
        body: JSON.stringify(body),
      }),
      // нужно сюда добавить логику для изменения статуса урока в кэше зависимости от ответа
    }),
  }),
});
