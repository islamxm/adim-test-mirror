"use client";
import { useTranslations } from "next-intl";

import { Box, Button, Grid } from "@mui/material";

import { useSelector } from "@/shared/lib";
import { Container } from "@/shared/ui/Container";
import { SectionHead } from "@/shared/ui/SectionHead";
import { ArrowRightIcon } from "@/shared/ui/icons";

import { CourseCard, ProgressBadge } from "@/entities/course";
import { userApi } from "@/entities/user";

export const ContinueLearningSection = () => {
  const { isAuth } = useSelector((s) => s.user);
  const { data, isError } = userApi.useGetHomeUserDataQuery(undefined, { skip: !isAuth });
  const t = useTranslations("pages.homePage.ContinueLearningSection");

  if (!isAuth || isError || !data?.continueLearning || data.continueLearning.length === 0) {
    return null;
  }

  return (
    <Box
      sx={(theme) => ({
        py: "3.5rem",
        backgroundColor: theme.palette.background.default,
      })}
    >
      <Container>
        <SectionHead title={t("title")} />
        <Grid container spacing={"2rem"}>
          {data.continueLearning.map((course) => (
            <Grid size={3} key={course.courseId}>
              <CourseCard
                id={course.courseId}
                image={course.courseIcon}
                totalLessonsCount={0}
                name={course.courseName}
                languages={[]}
                topFixedSlot={<ProgressBadge value={course.percent} />}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};
