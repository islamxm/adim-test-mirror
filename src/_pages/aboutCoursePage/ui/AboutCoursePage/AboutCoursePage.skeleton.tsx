import { Box, Stack } from "@mui/material";
import { motion } from "motion/react";

import { Container } from "@/shared/ui";

import { CourseDetailsCardSkeleton } from "../CourseDetailsCard/CourseDetailsCard.skeleton";
import { CourseMainInfoSkeleton } from "../CourseMainInfo/CourseMainInfo.skeleton";
import { RestInfoSkeleton } from "../RestInfo/RestInfo.skeleton";

export const AboutCoursePageSkeleton = () => {
  return (
    <Stack component={motion.div} initial={{ opacity: 0 }} animate={{ opacity: 1 }} pt={"20rem"}>
      <CourseMainInfoSkeleton />
      <Box
        sx={(theme) => ({
          backgroundColor: theme.palette.background.default,
        })}
      >
        <Container>
          <Stack direction={"row"}>
            <Box sx={{ width: "100%", maxWidth: "calc(100% - 46.7rem)" }}>
              <RestInfoSkeleton />
            </Box>
            <Box sx={{ transform: "translateY(-28rem)" }}>
              <CourseDetailsCardSkeleton />
            </Box>
          </Stack>
        </Container>
      </Box>
    </Stack>
  );
};
