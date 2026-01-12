import Image from "next/image";

import { Stack, Typography } from "@mui/material";
import { motion } from "motion/react";

import img from "../../../../../public/tl-1.png";

export const LessonIsNotSelected = () => {
  return (
    <Stack
      component={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      gap={"1.5rem"}
      sx={{ p: "5rem" }}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Image src={img} alt="Error" width={250} height={250} objectFit="contain" />
      <Typography variant="h3">Select a lesson</Typography>
    </Stack>
  );
};
