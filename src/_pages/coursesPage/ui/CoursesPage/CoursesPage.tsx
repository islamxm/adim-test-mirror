"use client";
import { courseApi, CourseCard, CourseCardSkeleton } from "@/entities/course";
import { useParams } from "next/navigation";
import { Box, Grid, Stack } from "@mui/material";
import { Container, SectionHead } from "@/shared/ui";
import { ResourceList } from "@/widgets/resourceList";

export const CoursesPage = () => {
  const params = useParams<{ category: string }>();
  const { data, isLoading, isSuccess, isError, fetchNextPage, hasNextPage } =
    courseApi.useGetCoursesByCategoryIdInfiniteQuery({
      categoryId: params?.category,
    });

  const courses = data?.pages.map((d) => d.courses).flat() || [];

  return (
    <Box sx={theme => ({backgroundColor: theme.palette.background.default,})}>
    <Container>
      <Stack
        sx={(theme) => ({
          py: "4.4rem",
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
                <CourseCardSkeleton />
              </Grid>
            ),
          }}
        >
          {courses.map((course) => (
            <Grid key={course.id} size={4}>
              <CourseCard {...course} />
            </Grid>
          ))}
        </ResourceList>
      </Stack>
    </Container>
    </Box>
  );
};
