import Image from "next/image";

import { Stack, Typography } from "@mui/material";
import { motion } from "motion/react";

import img from "../../../../../public/error-img.png";

export const LessonPageError = () => {
  return (
    <Stack
      component={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      py={"3rem"}
      gap={"1.5rem"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Image
        src={img}
        alt="Error"
        width={250}
        height={250}
        objectFit="contain"
        style={{ filter: "grayscale(1)" }}
      />
      <Typography variant="h3">Error, please try again!</Typography>
    </Stack>
  );
};
