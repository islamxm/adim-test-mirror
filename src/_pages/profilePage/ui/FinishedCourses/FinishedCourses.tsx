import { Button, IconButton, Stack, Typography, alpha } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";

import { ArrowLeftIcon } from "@/shared/ui/icons";

import { CourseCard, ProgressBadge, courseApi } from "@/entities/course";

export const FinishedCourses = () => {
  const { data, isLoading, isSuccess, isError, fetchNextPage, hasNextPage } =
    courseApi.useGetContinueLearningCoursesInfiniteQuery({}, { initialPageParam: 0 });

  const courses = data?.pages.map((d) => d.courses).flat() || [];

  if (courses.length === 0) {
    return null;
  }

  return (
    <Stack gap={"1rem"}>
      <Stack direction={"row"} justifyContent={"space-between"} gap={"1rem"}>
        <Typography variant="h2">Courses history</Typography>
        <Stack direction={"row"} gap={"1.6rem"} alignItems={"center"}>
          <IconButton color={"primary"} sx={{ boxShadow: `0 0 10px 5px ${alpha("#000", 0.15)}` }}>
            <ArrowLeftIcon sx={{ fontSize: "4.8rem" }} />
          </IconButton>
          <IconButton color={"primary"} sx={{ boxShadow: `0 0 10px 5px ${alpha("#000", 0.15)}` }}>
            <ArrowLeftIcon sx={{ fontSize: "4.8rem", transform: "rotate(180deg)" }} />
          </IconButton>
        </Stack>
      </Stack>
      <Swiper onReachEnd={fetchNextPage} slidesPerView={2} spaceBetween={"2rem"}>
        {courses.map((course) => (
          <SwiperSlide key={course.courseId}>
            <CourseCard
              id={course.courseId}
              image={course.courseIcon}
              totalLessonsCount={0}
              name={course.courseName}
              languages={[]}
              topFixedSlot={<ProgressBadge value={course.percent} />}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </Stack>
  );
};
