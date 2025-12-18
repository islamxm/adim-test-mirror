"use client";
import { Box, Stack } from "@mui/material";
import { FC, PropsWithChildren } from "react";
import { CourseSidebar } from "../CourseSidebar/CourseSidebar";
import { LessonsNavigation } from "../LessonsNavigation/LessonsNavigation";
import { useParams } from "next/navigation";

export const CoursePageLayout: FC<PropsWithChildren> = ({ children }) => {
  const {lesson} = useParams()

  return (
    <Stack
      sx={(theme) => ({
        backgroundColor: theme.palette.common.white,
        height: "100%",
        pt: "12.2rem",
        px: "1rem",
        flexDirection: "row",
      })}
    >
      <Box sx={{ flex: "0 0 39rem" }}>
        <CourseSidebar />
      </Box>
      <Box sx={{ flex: "1 1 auto"}}>
        {lesson && <LessonsNavigation/>}
        {children}
      </Box>
    </Stack>
  );
};
