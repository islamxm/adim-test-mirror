"use client";
import { FC } from "react";

import Link from "next/link";
import { useParams } from "next/navigation";

import { Stack, Typography, alpha } from "@mui/material";
import { AnimatePresence, motion } from "motion/react";

import { getLessonPage } from "@/shared/model";
import { CheckCircleFilledIcon } from "@/shared/ui/icons";

import { Lesson } from "@/entities/lesson";

import { LessonTypeIcon } from "../LessonTypeIcon/LessonTypeIcon";

type Props = Lesson & {};

export const LessonItem: FC<Props> = ({ id, name, type, isFinished, unitId }) => {
  const { course: courseId, lesson: lessonId } = useParams();
  const isActive = Number(lessonId) === id;

  return (
    <Stack
      direction={"row"}
      gap={"1rem"}
      alignItems={"center"}
      sx={(theme) => ({
        p: "1.4rem 2.4rem",
        position: "relative",
        backgroundColor: alpha(theme.palette.emerald.main, isActive ? 0.5 : 0),
        transition: "all .2s ease",
        color: theme.palette.primary.main,
        "&::after": {
          position: "absolute",
          top: 0,
          left: 0,
          height: "100%",
          width: isActive ? "3px" : 0,
          backgroundColor: theme.palette.primary.main,
          content: '""',
          transition: "all .2s ease",
        },
      })}
      component={Link}
      href={`${getLessonPage(Number(courseId), unitId, id)}?${new URLSearchParams({ tab: "units" })}`}
    >
      <LessonTypeIcon type={type} />
      <Typography sx={{ fontSize: "1.6rem", fontWeight: 600, flexGrow: 1 }}>{name}</Typography>
      <AnimatePresence>
        {isFinished && (
          <motion.div initial={{ scale: 0 }} exit={{ scale: 0 }} animate={{ scale: 1 }}>
            <CheckCircleFilledIcon sx={{ fontSize: "2.4rem" }} color={"primary"} />
          </motion.div>
        )}
      </AnimatePresence>
    </Stack>
  );
};
