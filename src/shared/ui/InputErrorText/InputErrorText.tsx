import { Typography } from "@mui/material";
import { motion } from "motion/react";
import { FC } from "react";

type Props = {
  children?: React.ReactNode;
};
export const InputErrorText: FC<Props> = ({ children }) => {
  if (!children) {
    return null;
  }
  return (
    <Typography
      component={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {children}
    </Typography>
  );
};
