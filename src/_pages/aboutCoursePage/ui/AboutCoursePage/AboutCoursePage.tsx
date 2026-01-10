"use client";
import { Box, Stack } from "@mui/material";
import { CourseMainInfo } from "../CourseMainInfo/CourseMainInfo";
import { Course, courseApi } from "@/entities/course";
import { FC } from "react";
import { RestInfo } from "../RestInfo/RestInfo";
import { CourseDetailsCard } from "../CourseDetailsCard/CourseDetailsCard";
import { Container } from "@/shared/ui";
import { useParams } from "next/navigation";
import { PageEnterAnimationLayout } from "@/widgets/pageEnterAnimationLayout";

type Props = {
  data?: Course;
};

export const AboutCoursePage: FC<Props> = () => {
  const { course } = useParams<{ course: string }>();
  const { data, isError, isLoading } = courseApi.useGetCourseByIdQuery(
    Number(course)
  );

  if (!data || isError || isLoading) {
    return null;
  }

  return (
    <PageEnterAnimationLayout>
      <Stack pt={"20rem"}>
        <CourseMainInfo name={data.name} description={data.description} />
        <Box
          sx={(theme) => ({
            backgroundColor: theme.palette.background.default,
          })}
        >
          <Container>
            <Stack direction={"row"}>
              <Box sx={{ width: "100%", maxWidth: "calc(100% - 46.7rem)" }}>
                <RestInfo explanation={data.explanation} />
              </Box>
              <Box sx={{ transform: "translateY(-28rem)" }}>
                <CourseDetailsCard
                  image={data.image}
                  languages={data.languages}
                  id={data.id}
                  totalLessonsCount={data.totalLessonsCount}
                />
              </Box>
            </Stack>
          </Container>
        </Box>
      </Stack>
    </PageEnterAnimationLayout>
  );
};
