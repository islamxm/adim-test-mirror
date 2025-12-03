"use client";
import { courseApi, CourseCardMod } from "@/entities/course";
import { useParams } from "next/navigation";
import { Box, Grid, Stack } from "@mui/material";
import { Container, SectionHead } from "@/shared/ui";
import { ResourceList } from "@/widgets/resourceList";
import { CourseCardModSkeleton } from "@/entities/course";

export const CoursesPage = () => {
  const params = useParams<{ category: string }>();
  const { data, isLoading, isSuccess, isError, fetchNextPage, hasNextPage } =
    courseApi.useGetCoursesByCategoryIdInfiniteQuery({
      categoryId: params?.category,
    });

  const courses = data?.pages.map((d) => d.courses).flat() || [];

  return (
    <Box bgcolor={(theme) => theme.palette.common.white}>
      <Container>
        <Stack
          sx={(theme) => ({
            py: "4.4rem",
            backgroundColor: theme.palette.common.white,
          })}
          gap={"4.4rem"}
        >
          <SectionHead
            sx={{ m: 0 }}
            title="explore courses categories"
            subtitle="Lorem ipsum dolor sit amet consectetur. Facilisi sollicitudin tempus sit ac. Tellus ac cras in metus curabitur aliquet."
          />
          <ResourceList
            isLoading={isLoading}
            isSuccess={isSuccess}
            isError={isError}
            onLoadMore={fetchNextPage}
            canLoadMore={hasNextPage}
            skeleton={{
              count: 3,
              component: (
                <Grid size={4}>
                  <CourseCardModSkeleton />
                </Grid>
              ),
            }}
          >
            {courses.map((course) => (
              <Grid key={course.id} size={4}>
                <CourseCardMod {...course} />
              </Grid>
            ))}
          </ResourceList>
        </Stack>
      </Container>
    </Box>
  );
};
