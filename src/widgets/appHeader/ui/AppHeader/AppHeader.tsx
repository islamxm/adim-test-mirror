"use client";
import { FC } from "react";

import { usePathname } from "next/navigation";

import { Box } from "@mui/material";
import { AnimatePresence, motion } from "motion/react";

import { cn } from "@/shared/lib";

import { CourseHeader } from "./CourseHeader";
import { MainHeader } from "./MainHeader";
import classes from "./classes.module.scss";

type Props = { isShowHeader: boolean };

export const AppHeader: FC<Props> = ({ isShowHeader }) => {
  const path = usePathname();
  const isCourseMainPage = path.includes("course") && path.includes("main");

  const showHeader = isShowHeader || isCourseMainPage;

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
        backgroundColor: isCourseMainPage ? theme.palette.gold.light : "transparent",
      })}
      className={cn([classes.wrapper, isCourseMainPage && classes.courseMainPage_variant])}
      component={motion.div}
      // exit={{ y: "-100%" }}
      animate={{
        y: showHeader ? "0" : "-100%",
      }}
    >
      {isCourseMainPage ? <CourseHeader /> : <MainHeader />}
    </Box>
  );
};
