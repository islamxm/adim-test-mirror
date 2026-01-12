import { FC } from "react";

import { Box, Typography } from "@mui/material";

import { lessonApi } from "@/entities/lesson";

import { ResourceList } from "@/widgets/resourceList";

import { Comment } from "../Comment/Comment";
import { CommentSkeleton } from "../Comment/Comment.skeleton";

type Props = {
  commentId: number;
  lessonId: number;
};

export const Replies: FC<Props> = ({ commentId, lessonId }) => {
  const { data, fetchNextPage, hasNextPage, isLoading, isSuccess, isError, error } =
    lessonApi.useGetLessonCommentRepliesInfiniteQuery(
      { commentId, limit: 20, lessonId },
      { skip: !commentId || isNaN(lessonId) },
    );

  const comments =
    data?.pages && data?.pages.length > 0 ? data.pages.map((p) => p.comments).flat() : [];

  return (
    <Box
      sx={(theme) => ({
        borderLeft: `2px solid ${theme.palette.primary[100]}`,
      })}
    >
      <ResourceList
        isLoading={isLoading}
        isError={isError}
        isSuccess={isSuccess}
        onLoadMore={fetchNextPage}
        canLoadMore={hasNextPage}
        skeleton={{
          count: 1,
          component: <CommentSkeleton />,
        }}
        disableInfiniteScroll
        loadMoreElement={(onClick) => (
          <Typography
            component={"p"}
            onClick={onClick}
            sx={(theme) => ({
              fontSize: "1.2rem",
              color: theme.palette.text.secondary,
              textAlign: "center",
              cursor: "pointer",
            })}
          >
            Load more
          </Typography>
        )}
      >
        {/* <AnimatePresence> */}
        {comments.map((comment) => (
          <Comment data={comment} key={comment.id} />
        ))}
        {/* </AnimatePresence> */}
      </ResourceList>
    </Box>
  );
};
