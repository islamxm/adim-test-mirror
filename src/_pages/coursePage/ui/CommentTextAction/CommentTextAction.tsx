import { FC, useEffect, useState } from "react";
import { toast } from "react-toastify";

import { useParams } from "next/navigation";

import { Box, Button, IconButton, Paper, Stack, TextField, Typography, alpha } from "@mui/material";
import { AnimatePresence, motion } from "motion/react";

import { ArrowUpIcon } from "@/shared/ui/icons";
import { CloseIcon } from "@/shared/ui/icons";

import { lessonApi } from "@/entities/lesson";
import { Avatar, userApi } from "@/entities/user";

type Props = {
  replyData?: {
    parent: { id: number; text: string; userAvatar: string | undefined };
    lessonId: number;
  };
  onCancelReply?: () => any;
};

export const CommentTextAction: FC<Props> = ({ replyData, onCancelReply }) => {
  const { data: user } = userApi.useGetUserProfileQuery({});
  const [value, setValue] = useState("");
  const { lesson } = useParams();
  const lessonId = Number(lesson);
  const [createComment, createCommentStatus] = lessonApi.useCreateCommentMutation();
  const [createCommentReply, createCommentReplyStatus] = lessonApi.useCreateReplyCommentMutation();

  const onSubmit = () => {
    if (user && !isNaN(lessonId) && value) {
      if (replyData) {
        createCommentReply({
          text: value,
          lessonId,
          parentId: replyData.parent.id,
          user,
        });
        onCancelReply?.();
      } else {
        createComment({ text: value, lessonId, user });
      }
    }
    setValue("");
  };

  useEffect(() => {
    if (createCommentStatus.isError) {
      toast.error("Error on comment!");
    }
  }, [createCommentStatus.isError]);

  useEffect(() => {
    if (createCommentReplyStatus.isError) {
      toast.error("Error on comment reply!");
    }
  }, [createCommentReplyStatus.isError]);

  return (
    <Stack alignItems={"flex-start"} py={"2rem"} direction={"row"} gap={"1.4rem"}>
      <Box sx={{ position: "relative", width: "100%" }}>
        <AnimatePresence>
          {replyData && (
            <Paper
              sx={(theme) => ({
                backgroundColor: theme.palette.common.white,
                borderRadius: "3rem",
                position: "absolute",
                top: 0,
                left: 0,
                transform: "translateY(calc(-100% - 10px))",
                width: "100%",
                overflow: "hidden",
              })}
              elevation={0}
              component={motion.div}
              initial={{ opacity: 0 }}
              exit={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <Stack
                alignItems={"center"}
                gap={"1rem"}
                direction={"row"}
                sx={(theme) => ({
                  overflow: "hidden",
                  width: "100%",
                  p: "1rem",
                  backgroundColor: alpha(theme.palette.primary[100], 0.4),
                })}
              >
                {/* <Typography>
                Reply:
              </Typography> */}
                <Avatar avatarUrl={replyData.parent.userAvatar} />
                <Typography noWrap sx={{ width: "100%" }}>
                  {replyData.parent.text}
                </Typography>
                <IconButton onClick={onCancelReply} sx={{ flex: "0 0 auto" }}>
                  <CloseIcon sx={{ fontSize: "2rem" }} />
                </IconButton>
              </Stack>
            </Paper>
          )}
        </AnimatePresence>

        <TextField
          sx={{ "& .MuiInputBase-root": { borderRadius: "2.4rem" } }}
          placeholder="Your comment"
          fullWidth
          maxRows={5}
          minRows={1}
          multiline
          onChange={(e) => setValue(e.target.value)}
          value={value}
        />
      </Box>

      <Button
        variant={"contained"}
        sx={{
          borderRadius: "50%",
          flexShrink: 0,
          p: 0,
          minHeight: "unset",
          minWidth: "unset",
          width: "4.8rem",
          height: "4.8rem",
        }}
        onClick={onSubmit}
        disabled={!value}
      >
        <ArrowUpIcon sx={{ fontSize: "2.8rem" }} />
      </Button>
    </Stack>
  );
};
