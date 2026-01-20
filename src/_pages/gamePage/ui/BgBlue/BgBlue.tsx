import { FC } from "react";

import { Box } from "@mui/material";
import { motion } from "motion/react";

type Props = { isDoubleBg: boolean };

export const BgBlue: FC<Props> = ({ isDoubleBg }) => {
  return (
    <Box
      sx={{
        position: "fixed",
        height: "100%",
        width: "100%",
        top: 0,
        left: 0,

        background: "radial-gradient(circle,rgba(2, 120, 255, 1) 40%, rgba(2, 120, 255, 0) 80%)",
      }}
      component={motion.div}
      initial={{ x: "0", opacity: 0, scaleY: 1.5 }}
      exit={{ x: "0", opacity: 0, scaleY: 1.5 }}
      transition={{
        ease: "circInOut",
        duration: 1,
      }}
      variants={{
        double: {
          x: "-45%",
          opacity: 1,
        },
        single: {
          x: "0",
          opacity: 1,
        },
      }}
      animate={isDoubleBg ? "double" : "single"}
    ></Box>
  );
};
