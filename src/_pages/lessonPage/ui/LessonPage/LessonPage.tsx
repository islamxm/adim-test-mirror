"use client";
import { lessonApi } from "@/entities/lesson";
import { HTMLContent } from "@/shared/ui";
import { Stack, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { useParams } from "next/navigation";
import { LessonPageSkeleton } from "./LessonPage.skeleton";
import { LessonPageError } from "./LessonPage.error";

export const LessonPage = () => {
  const { lesson } = useParams();
  const { data, isError, isLoading } = lessonApi.useGetLessonQuery(Number(lesson));

  if (isLoading) {
    return <LessonPageSkeleton />;
  }

  if (isError || !data) {
    return <LessonPageError />;
  }

  return (
    <Stack gap={"2.4rem"} component={motion.div} initial={{ opacity: 0 }} exit={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <Typography variant={"h2"}>{data.name}</Typography>
      <HTMLContent value={data.blog} />
    </Stack>
  );
};
