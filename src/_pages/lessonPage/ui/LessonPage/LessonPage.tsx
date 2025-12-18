"use client";
import { lessonApi } from "@/entities/lesson";
import { HTMLContent } from "@/shared/ui";
import { Stack, Typography } from "@mui/material";
import { useParams } from "next/navigation";

export const LessonPage = () => {
  const { lesson } = useParams();
  const { data, isError } = lessonApi.useGetLessonQuery(Number(lesson));
  
  if (isError || !data) {
    return null;
  }

  return (
    <Stack px={"5rem"}>
      <Typography variant={"h2"}>{data.name}</Typography>
      <HTMLContent value={data.blog}/>
    </Stack>
  );
};
