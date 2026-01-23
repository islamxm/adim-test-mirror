import { FC, PropsWithChildren, useEffect } from "react";

import { motion } from "motion/react";

type Props = PropsWithChildren<{
  layoutId: string;
}>;

export const PlayerAnimatedWrapper: FC<Props> = ({ layoutId, children }) => {
  return (
    <motion.div style={{ position: "relative" }} layoutId={layoutId} layout>
      {children}
    </motion.div>
  );
};
