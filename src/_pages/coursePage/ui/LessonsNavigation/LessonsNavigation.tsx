import { useParams } from "next/navigation";

import { IconButton, Stack, Typography } from "@mui/material";
import { AnimatePresence, motion } from "motion/react";

import { useRouterProgress } from "@/shared/lib";
import { getLessonPage } from "@/shared/model";
import { ArrowLeftCircleIcon, ArrowRightCircleIcon } from "@/shared/ui/icons";

import { courseApi } from "@/entities/course";

export const LessonsNavigation = () => {
  const router = useRouterProgress();
  const { course: courseId, unit: unitId, lesson: lessonId } = useParams();
  const { data } = courseApi.useGetCourseByIdQuery(Number(courseId));
  // const lessonsCount = data?.totalLessonsCount;
  const lessons = data?.units.find((unit) => unit.id === Number(unitId))?.lessons || [];
  const currentLessonIndex = Number(lessons.findIndex((lesson) => lesson.id === Number(lessonId)));
  const lessonsCount = lessons.length;

  const onPrev = () => {
    if (currentLessonIndex === 0) {
      return;
    }
    router.push(
      `${getLessonPage(
        Number(courseId),
        Number(unitId),
        lessons[currentLessonIndex - 1].id,
      )}?tab=units`,
    );
  };
  const onNext = () => {
    if (currentLessonIndex + 1 === lessonsCount) {
      return;
    }
    router.push(
      `${getLessonPage(
        Number(courseId),
        Number(unitId),
        lessons[currentLessonIndex + 1].id,
      )}?tab=units`,
    );
  };

  if (currentLessonIndex === -1) {
    return null;
  }

  return (
    <Stack
      direction={"row"}
      sx={(theme) => ({
        p: "2rem 5rem",
        width: "100%",
        borderRadius: "2rem",
        backgroundColor: theme.palette.common.white,
        // background:
        //   "linear-gradient(180deg,rgba(255, 255, 255, 1) 60%, rgba(255, 255, 255, 0.67) 87%, rgba(255, 255, 255, 0) 100%)",
      })}
      gap={"2rem"}
      justifyContent={"space-between"}
    >
      <Typography sx={{ overflow: "hidden", fontSize: "1.8rem" }}>
        material{" "}
        <AnimatePresence mode="wait">
          <motion.span
            style={{ display: "inline-block" }}
            key={currentLessonIndex + 1}
            initial={{ y: "-100%", opacity: 0 }}
            exit={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3, type: "spring" }}
          >
            {currentLessonIndex + 1}
          </motion.span>{" "}
        </AnimatePresence>{" "}
        of {lessonsCount}
      </Typography>
      <Stack direction={"row"} gap={".2rem"}>
        <IconButton onClick={onPrev} sx={{ p: 0 }} color={"primary"}>
          <ArrowLeftCircleIcon sx={{ fontSize: "3.2rem" }} />
        </IconButton>
        <IconButton onClick={onNext} sx={{ p: 0 }} color={"primary"}>
          <ArrowRightCircleIcon sx={{ fontSize: "3.2rem" }} />
        </IconButton>
      </Stack>
    </Stack>
  );
};
