"use client";
import { FC, PropsWithChildren } from "react";

import { motion } from "motion/react";

export const PageEnterAnimationLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      style={{ height: "100%", overflowY: "auto" }}
    >
      {children}
    </motion.div>
  );
};
