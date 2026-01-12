"use client";
import { FC, useState } from "react";

import { useParams } from "next/navigation";

import { Button, Grid, IconButton, Paper, Stack, Typography, alpha } from "@mui/material";
import dayjs from "dayjs";
import "dayjs/locale/tk";
import relativeTime from "dayjs/plugin/relativeTime";
import { motion } from "motion/react";

import { ArrowSubRightDownIcon, MoreMenuIcon } from "@/shared/ui/icons";

import { Comment as CommentType } from "@/entities/lesson";
import { Avatar } from "@/entities/user";

import { Replies } from "../Replies/Replies";

dayjs.extend(relativeTime);
dayjs.locale("tk");

type Props = {
  data: CommentType;
  onReply?: (parent: { id: number; text: string; userAvatar: string | undefined }) => void;
};

export const Comment: FC<Props> = ({ data, onReply }) => {
  const { lesson } = useParams();
  const lessonId = Number(lesson);
  const { userAvatar, userName, createdAt, text, status, id, hasReplies, isOwn } = data;
  const [isOpenReplies, setIsOpenReplies] = useState(false);

  return (
    <Paper
      component={motion.div}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      sx={(theme) => ({
        p: "1.6rem",
        width: "100%",
        minHeight: "15.6rem",
        backgroundColor: isOwn ? alpha(theme.palette.primary[100], 0.1) : "none",
      })}
      layout={"preserve-aspect"}
      elevation={0}
    >
      <Stack
        gap={"1.3rem"}
        component={motion.div}
        style={{ opacity: status === "loading" ? 0.4 : 1 }}
      >
        <Stack gap={"1.2rem"} alignItems={"flex-start"} direction={"row"}>
          <Avatar shadowType={"light"} avatarUrl={userAvatar} size="3.8rem" />
          <Stack gap={".4rem"} sx={{ flexGrow: 1 }}>
            <Typography sx={{ fontSize: "1.4rem", fontWeight: 600 }}>{userName}</Typography>
            <Typography
              sx={(theme) => ({
                fontSize: "1.2rem",
                color: theme.palette.text.secondary,
              })}
            >
              {dayjs(createdAt).fromNow()}
            </Typography>
          </Stack>
          {/* {
            isOwn && (
              <IconButton>
                <MoreMenuIcon sx={{fontSize: "2.4rem"}}/>
              </IconButton>
            ) 
          } */}
        </Stack>
        <Typography>{text}</Typography>
        <Grid container>
          <Grid size={6}>
            {hasReplies && (
              <Button
                sx={{
                  fontSize: "1.4rem",
                  p: "1rem",
                  minHeight: "unset",
                  backgroundColor: "unset",
                }}
                variant="text"
                endIcon={
                  <ArrowSubRightDownIcon
                    sx={{
                      rotate: isOpenReplies ? "180deg" : "0deg",
                      transition: "all .2s ease",
                    }}
                  />
                }
                onClick={() => setIsOpenReplies((s) => !s)}
              >
                {isOpenReplies ? "Hide" : "Show"} replies
              </Button>
            )}
          </Grid>
          <Grid size={6} sx={{ display: "flex", justifyContent: "flex-end" }}>
            {onReply && !isOwn && (
              <Button
                color="success"
                sx={{
                  fontSize: "1.4rem",
                  p: "1rem",
                  minHeight: "unset",
                  backgroundColor: "unset",
                }}
                variant="text"
                onClick={() =>
                  onReply?.({
                    id,
                    text,
                    userAvatar,
                  })
                }
              >
                Reply
              </Button>
            )}
          </Grid>
        </Grid>
        {isOpenReplies && <Replies lessonId={lessonId} commentId={id} />}
      </Stack>
    </Paper>
  );
};
