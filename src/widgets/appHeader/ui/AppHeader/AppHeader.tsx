"use client";
import { Box } from "@mui/material";
import { Navbar } from "../Navbar/Navbar";
import classes from "./classes.module.scss";
import { StreakInfo } from "@/features/user/streak-info";
import { cn, useSelector } from "@/shared/lib";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { UserAvatar } from "@/features/user/user-avatar";
import { CourseHeadGoBack } from "@/features/course/course-head-go-back";
import { RightSide } from "../RightSide/RightSide";

export const AppHeader = () => {
  const { isAuth } = useSelector((s) => s.user);
  const path = usePathname();
  const isCourseMainPage = path.includes("course") && path.includes("main");

  return (
    <Box
      sx={(theme) => ({
        p: isCourseMainPage ? "2rem 1rem" : "2rem 0",
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        zIndex: 10,
        height: "9.8rem",
        overflow: "hidden",
        borderBottom: `1px solid ${
          isCourseMainPage ? theme.palette.grey[300] : "transparent"
        }`,
      })}
      className={cn([
        classes.wrapper,
        isCourseMainPage && classes.courseMainPage_variant,
      ])}
      component={motion.div}
      layout
    >
      {isCourseMainPage && (
        <div className={classes.left}>
          <CourseHeadGoBack />
        </div>
      )}
      <AnimatePresence>
        {isCourseMainPage && (
          <motion.div
            initial={{ clipPath: "circle(0% at 50% 50%)", opacity: 1 }}
            exit={{ clipPath: "circle(0% at 50% 50%)", opacity: 1 }}
            animate={{ clipPath: "circle(100% at 50% 50%)", opacity: 1 }}
            style={{ backgroundColor: "#fff", position: "absolute", inset: 0 }}
            transition={{ duration: 0.5 }}
          />
        )}
      </AnimatePresence>
      <Navbar
        disableNavigation={isCourseMainPage}
        disableShadow={isCourseMainPage}
        endSlot={<AnimatePresence>{isAuth && <UserAvatar />}</AnimatePresence>}
        sx={{
          gridArea: "main",
          position: "relative",
          zIndex: 2,
        }}
      />
      <AnimatePresence>
        {isAuth && !isCourseMainPage && (
          <div className={classes.left}>
            <StreakInfo />
          </div>
        )}
        {!isCourseMainPage && (
          <motion.div layout className={classes.right} style={{ width: "100%" }}>
            <RightSide />
          </motion.div>
        )}
      </AnimatePresence>
    </Box>
  );
};
