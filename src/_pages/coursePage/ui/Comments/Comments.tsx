import { lessonApi } from "@/entities/lesson";
import { Box, Stack } from "@mui/material";
import { motion } from "motion/react";
import { useParams } from "next/navigation";
import { Comment } from "../Comment/Comment";
import { CommentTextAction } from "../CommentTextAction/CommentTextAction";

export const Comments = () => {
  const { lesson } = useParams();
  const lessonId = Number(lesson);
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isSuccess,
    isError,
    error,
  } = lessonApi.useGetLessonCommentsInfiniteQuery(
    { cursor: "0", lessonId: lessonId },
    { skip: !lessonId || isNaN(lessonId) }
  );

  const comments = data?.pages[0].comments || [];

  return (
    <Stack
      component={motion.div}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      gap={".5rem"}
      sx={{ flexGrow: 1, minHeight: 0, overflowY: "auto" }}
    >
      <Stack sx={{flexGrow: 1}} gap={".5rem"}>
        {comments.map((comment: any) => (
          <Comment {...comment} key={comment.id} />
        ))}
      </Stack>
      <Box sx={{flex: "0 0 auto", position: "sticky", bottom: 0}}><CommentTextAction /></Box>
    </Stack>
  );
};
