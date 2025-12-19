"use client";
import { Comment as CommentType } from "@/entities/lesson";
import { Avatar } from "@/entities/user";
import { Button, Paper, Stack, Typography } from "@mui/material";
import { motion } from "motion/react";
import { FC } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import 'dayjs/locale/tk'
dayjs.extend(relativeTime);
dayjs.locale("tk")

import { ArrowSubRightDownIcon } from "@/shared/ui/icons";

type Props = CommentType;

export const Comment: FC<Props> = ({
  userAvatar,
  userName,
  createdAt,
  text,
}) => {
  return (
    <Paper
      component={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      sx={(theme) => ({
        p: "1.6rem",
        // backgroundColor: alpha(theme.palette.primary[100], 0.1),
      })}
      elevation={0}
    >
      <Stack gap={"1.3rem"}>
        <Stack gap={"1.2rem"} alignItems={"center"} direction={"row"}>
          <Avatar isShadow avatarUrl={userAvatar} size="3.8rem" />
          <Stack gap={".4rem"}>
            <Typography sx={{ fontSize: "1.4rem", fontWeight: 600 }}>
              {userName}
            </Typography>
            <Typography
              sx={(theme) => ({
                fontSize: "1.2rem",
                color: theme.palette.text.secondary,
              })}
            >
              {dayjs(createdAt).fromNow()}
            </Typography>
          </Stack>
        </Stack>
        <Typography>{text}</Typography>
        <Stack direction={"row"} justifyContent={"space-between"}>
          <Button
            sx={{
              fontSize: "1.4rem",
              p: "1rem",
              minHeight: "unset",
              backgroundColor: "unset",
            }}
            variant="text"
            endIcon={<ArrowSubRightDownIcon />}
          >
            Show replies
          </Button>
          <Button
            color="success"
            sx={{
              fontSize: "1.4rem",
              p: "1rem",
              minHeight: "unset",
              backgroundColor: "unset",
            }}
            variant="text"
          >
            Reply
          </Button>
        </Stack>
      </Stack>
    </Paper>
  );
};
