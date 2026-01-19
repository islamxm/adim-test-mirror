"use client";
import { useEffect } from "react";

import { useParams, useRouter } from "next/navigation";

import { Stack } from "@mui/material";
import { motion } from "motion/react";

import { getLessonPage } from "@/shared/model";

import { courseApi } from "@/entities/course";

import { UnitPart } from "../UnitPart/UnitPart";

export const UnitsList = () => {
  const router = useRouter();
  const { course } = useParams();
  const { data, isError } = courseApi.useGetCourseByIdQuery(Number(course));

  useEffect(() => {
    if (data?.units && data?.units[0].lessons && course) {
      const courseId = Number(course);
      const defaultUnitId = data.units[0].id;
      const defaultLessonId = data?.units[0].lessons[0].id;
      router.push(
        `${getLessonPage(courseId, defaultUnitId, defaultLessonId)}?${new URLSearchParams({ tab: "units" })}`,
      );
    }
  }, [data, router, course]);

  if (!data || isError) {
    return null;
  }

  const units = data.units;

  return (
    <Stack
      sx={{ overflowY: "auto" }}
      component={motion.div}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {units.map((unit) => (
        <UnitPart key={unit.id} {...unit} />
      ))}
    </Stack>
  );
};
