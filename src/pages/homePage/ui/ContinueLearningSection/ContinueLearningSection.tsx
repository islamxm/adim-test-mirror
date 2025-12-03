"use client";
import { CourseCard } from "@/entities/course";
import { Container } from "@/shared/ui/Container";
import { ArrowRightIcon } from "@/shared/ui/icons";
import { SectionHead } from "@/shared/ui/SectionHead";
import { Box, Button, Stack } from "@mui/material";
import { userApi } from "@/entities/user";

export const ContinueLearningSection = () => {
  const { data, isError } = userApi.useGetHomeUserDataQuery(undefined);

  if (isError || !data?.continueLearning || data.continueLearning.length === 0) {
    return null;
  }

  return (
    <Box
      sx={(theme) => ({
        backgroundColor: theme.palette.common.white,
        py: "3.5rem",
      })}
    >
      <Container>
        <SectionHead
          title="Continue Learning"
          action={
            <Button variant={"contained"} endIcon={<ArrowRightIcon />}>
              See all
            </Button>
          }
        />
        <Stack direction={"row"} gap={"20px"}>
          {data.continueLearning.map((course) => (
            <CourseCard
              key={course.courseId}
              id={course.courseId}
              name={course.courseName}
              icon={course.courseIcon}
            />
          ))}
        </Stack>
      </Container>
    </Box>
  );
};
