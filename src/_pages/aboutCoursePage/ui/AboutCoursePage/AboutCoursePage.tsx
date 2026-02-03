"use client";
import { FC } from "react";

import { useParams } from "next/navigation";

import { Box, Stack } from "@mui/material";
import { motion } from "motion/react";

import { Container } from "@/shared/ui";

import { Course, courseApi } from "@/entities/course";

import { PageEnterAnimationLayout } from "@/widgets/pageEnterAnimationLayout";

import { CourseDetailsCard } from "../CourseDetailsCard/CourseDetailsCard";
import { CourseMainInfo } from "../CourseMainInfo/CourseMainInfo";
import { RestInfo } from "../RestInfo/RestInfo";
import { AboutCoursePageSkeleton } from "./AboutCoursePage.skeleton";

type Props = {
  data?: Course;
};

export const AboutCoursePage: FC<Props> = () => {
  const { course } = useParams<{ course: string }>();
  const { data, isError, isLoading } = courseApi.useGetCourseByIdQuery(Number(course));

  return (
    <PageEnterAnimationLayout>
      {isLoading && <AboutCoursePageSkeleton />}
      {data && (
        <Stack
          component={motion.div}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          pt={"20rem"}
          sx={{ height: "100%" }}
        >
          <CourseMainInfo name={data.name} description={data.description} />
          <Box
            sx={(theme) => ({
              backgroundColor: theme.palette.background.default,
              flexGrow: 1,
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
      )}
    </PageEnterAnimationLayout>
  );
};
