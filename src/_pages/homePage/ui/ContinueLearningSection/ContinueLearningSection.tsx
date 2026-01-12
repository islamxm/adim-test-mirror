"use client";
import { useTranslations } from "next-intl";

import { Box, Button, Stack } from "@mui/material";

import { useSelector } from "@/shared/lib";
import { Container } from "@/shared/ui/Container";
import { SectionHead } from "@/shared/ui/SectionHead";
import { ArrowRightIcon } from "@/shared/ui/icons";

import { CourseCard } from "@/entities/course";
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
        <SectionHead
          title={t("title")}
          action={
            <Button variant={"contained"} endIcon={<ArrowRightIcon />}>
              {t("more_button")}
            </Button>
          }
        />
        {/* <Stack direction={"row"} gap={"20px"}>
          {data.continueLearning.map((course) => (
            <CourseCard
              key={course.courseId}
              id={course.courseId}
              name={course.courseName}
              icon={course.courseIcon}
            />
          ))}
        </Stack> */}
      </Container>
    </Box>
  );
};
