"use client";
import { useEffect } from "react";

import { usePathname } from "next/navigation";

import { CSSProperties } from "@mui/material";
import { AnimatePresence, motion } from "motion/react";

import { useDispatch, useSelector } from "@/shared/lib";

import { runCallback } from "../../lib";
import { screenFillingCircleActions } from "../../model";
import classes from "./classes.module.scss";

export const Anim_ScreenFillingCircle = () => {
  const { isActive, options } = useSelector((s) => s.ANIM_screenFillingCircle);
  const dispatch = useDispatch();
  const isAnimate = isActive && options;
  const pathname = usePathname();

  const style: CSSProperties | undefined = !isActive
    ? {
        pointerEvents: "none",
        touchAction: "none",
      }
    : undefined;

  useEffect(() => {
    dispatch(screenFillingCircleActions.finish());
  }, [pathname, dispatch]);

  return (
    <AnimatePresence>
      {isAnimate && (
        <motion.div
          className={classes.wrap}
          style={{ ...style, backgroundColor: options.color }}
          initial={{ clipPath: `circle(0% at ${options.x}px ${options.y}px)` }}
          animate={{ clipPath: `circle(100% at ${options.x}px ${options.y}px)` }}
          exit={{ opacity: 0, transition: { duration: 0.2 } }}
          transition={{ duration: 0.5, ease: "easeIn" }}
          onAnimationComplete={() => {
            if (options.completeCbId) {
              runCallback(options.completeCbId);
            }
          }}
        />
      )}
    </AnimatePresence>
  );
};
