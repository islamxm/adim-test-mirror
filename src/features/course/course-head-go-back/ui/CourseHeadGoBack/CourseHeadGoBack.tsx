import { courseApi } from "@/entities/course";
import { Button, Stack, Typography } from "@mui/material";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeftCircleIcon } from "@/shared/ui/icons";
import { motion } from "motion/react";
import { getAboutCoursePage } from "@/shared/model";

export const CourseHeadGoBack = () => {
  const router = useRouter();
  const { course } = useParams();
  const { data, isError } = courseApi.useGetCourseByIdQuery(Number(course));

  if (isError || !data) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.3 }}
    >
      <Button onClick={() => router.push(getAboutCoursePage(Number(course)))}>
        <Stack direction={"row"} gap={"1.5rem"} alignItems={"center"}>
          <ArrowLeftCircleIcon sx={{ fontSize: "2.4rem" }} />
          <Typography sx={{ fontSize: "2.4rem", fontWeight: 600 }} variant="h3">
            {data.name}
          </Typography>
        </Stack>
      </Button>
    </motion.div>
  );
};
