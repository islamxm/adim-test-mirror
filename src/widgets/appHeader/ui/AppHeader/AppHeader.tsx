"use client";
import { usePathname } from "next/navigation";

import { Box } from "@mui/material";
import { motion } from "motion/react";

import { cn } from "@/shared/lib";

import { CourseHeader } from "./CourseHeader";
import { MainHeader } from "./MainHeader";
import classes from "./classes.module.scss";

export const AppHeader = () => {
  const path = usePathname();
  const isCourseMainPage = path.includes("course") && path.includes("main");

  return (
    <Box
      sx={(theme) => ({
        p: "2rem 1rem",
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        zIndex: 10,
        height: "9.8rem",
        overflow: "hidden",
        borderBottom: `1px solid ${isCourseMainPage ? theme.palette.grey[300] : "transparent"}`,
      })}
      className={cn([classes.wrapper, isCourseMainPage && classes.courseMainPage_variant])}
      component={motion.div}
    >
      {isCourseMainPage ? <CourseHeader /> : <MainHeader />}
    </Box>
  );
};
