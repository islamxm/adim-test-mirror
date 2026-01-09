"use client";
import { Box, Stack } from "@mui/material";
import { FC, PropsWithChildren } from "react";
import { CourseSidebar } from "../CourseSidebar/CourseSidebar";
import { LessonsNavigation } from "../LessonsNavigation/LessonsNavigation";
import { useParams } from "next/navigation";
import { LessonIsNotSelected } from "@/_pages/lessonPage";

export const CoursePageLayout: FC<PropsWithChildren> = ({ children }) => {
  const { lesson } = useParams();

  return (
    <Stack
      sx={(theme) => ({
        backgroundColor: theme.palette.common.white,
        height: "100vh",
        pt: "12.2rem",
        px: "1rem",
      })}
      direction={"row"}
    >
      <Box sx={{ flex: "0 0 39rem" }}>
        <CourseSidebar />
      </Box>
      <Box sx={{ flex: "1 1 auto", overflowY: "auto" }}>
        <Box sx={{ height: "7.2rem", position: "sticky", top: 0, zIndex: 2 }}>
          {lesson && <LessonsNavigation />}
        </Box>
        <Box px={"5rem"}>{!lesson ? <LessonIsNotSelected /> : children}</Box>
      </Box>
    </Stack>
  );
};
