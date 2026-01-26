"use client";
import { useEffect } from "react";

import { useParams } from "next/navigation";

import { Stack, Typography } from "@mui/material";
import { motion } from "framer-motion";

import { HTMLContent } from "@/shared/ui";

import { VideoPlayer, lessonApi } from "@/entities/lesson";

import { LessonPageError } from "./LessonPage.error";
import { LessonPageSkeleton } from "./LessonPage.skeleton";

/** время по истечению которого урок пометиться как пройденный на 100% (в миллисекундах) */
const FINISH_TIME = 5000;

export const LessonPage = () => {
  const { lesson, course } = useParams();
  const { data, isError, isLoading, isSuccess } = lessonApi.useGetLessonQuery(Number(lesson));
  const [finishLesson] = lessonApi.useFinishLessonMutation();

  useEffect(() => {
    if (data && !data.isFinished && isSuccess && course) {
      const finishTimer = setTimeout(() => {
        finishLesson({ lessonId: data.id, courseId: Number(course) });
      }, FINISH_TIME);

      return () => {
        clearTimeout(finishTimer);
      };
    }
  }, [data, isSuccess, course, finishLesson]);

  if (isLoading) {
    return <LessonPageSkeleton />;
  }

  if (isError || !data) {
    return <LessonPageError />;
  }

  return (
    <Stack
      gap={"2.4rem"}
      component={motion.div}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <Typography variant={"h2"}>{data.name}</Typography>
      {data.type === "VIDEO" && <VideoPlayer src={data.video?.filename} title={data.name} />}
      <HTMLContent value={data.blog} />
    </Stack>
  );
};
