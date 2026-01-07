import { lessonApi } from "@/entities/lesson";
import { Box, Stack } from "@mui/material";
import { motion } from "motion/react";
import { useParams } from "next/navigation";
import { Comment } from "../Comment/Comment";
import { CommentTextAction } from "../CommentTextAction/CommentTextAction";
import { ResourceList } from "@/widgets/resourceList";
import { useState } from "react";
import { CommentSkeleton } from "../Comment/Comment.skeleton";

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
  } = lessonApi.useGetLessonCommentsInfiniteQuery(
    { lessonId, limit: 20 },
    { skip: !lessonId || isNaN(lessonId) }
  );
  
  const [replyData, setReplyData] = useState<{
    parent: { id: number; text: string; userAvatar: string | undefined };
    lessonId: number;
  }>();

  const comments =
    data?.pages && data?.pages.length > 0
      ? data.pages.map((p) => p.comments).flat()
      : [];

  return (
    <Stack
      component={motion.div}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      gap={".5rem"}
      layout={"size"}
      sx={{ flexGrow: 1, minHeight: 0, overflowY: "auto" }}
    >
      <Stack component={motion.div} layout sx={{ flexGrow: 1 }} gap={".5rem"}>
        <ResourceList
          isLoading={isLoading}
          isError={isError}
          isSuccess={isSuccess}
          onLoadMore={fetchNextPage}
          canLoadMore={hasNextPage}
          skeleton={{
            count: 3,
            component: <CommentSkeleton />,
          }}
        >
          {/* <AnimatePresence> */}
          {comments.map((comment) => (
            <Comment
              onReply={(parent) =>
                setReplyData({
                  parent,
                  lessonId,
                })
              }
              data={comment}
              key={comment.id}
            />
          ))}
          {/* </AnimatePresence> */}
        </ResourceList>
      </Stack>
      <Box sx={{ flex: "0 0 auto", position: "sticky", bottom: 0 }}>
        <CommentTextAction
          onCancelReply={() => setReplyData(undefined)}
          replyData={replyData}
        />
      </Box>
    </Stack>
  );
};
