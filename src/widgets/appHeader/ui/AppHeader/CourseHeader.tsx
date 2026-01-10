import classes from "./classes.module.scss";
import { AnimatePresence, motion } from "motion/react";
import { UserAvatar } from "@/features/user/user-avatar";
import { CourseHeadGoBack } from "@/features/course/course-head-go-back";

export const CourseHeader = () => {
  return (
    <>
      <div className={classes.left}>
        <CourseHeadGoBack />
      </div>
      <AnimatePresence>
        <motion.div
          initial={{ clipPath: "circle(0% at 50% 50%)", opacity: 1 }}
          exit={{ clipPath: "circle(0% at 50% 50%)", opacity: 1 }}
          animate={{ clipPath: "circle(100% at 50% 50%)", opacity: 1 }}
          style={{ backgroundColor: "#fff", position: "absolute", inset: 0 }}
          transition={{ duration: 0.5 }}
        />
      </AnimatePresence>
      <UserAvatar />
    </>
  );
};
