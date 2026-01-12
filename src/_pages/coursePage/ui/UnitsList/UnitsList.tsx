"use client";
import { useParams } from "next/navigation";

import { Stack } from "@mui/material";
import { motion } from "motion/react";

import { courseApi } from "@/entities/course";

import { UnitPart } from "../UnitPart/UnitPart";

export const UnitsList = () => {
  const { course } = useParams();
  const { data, isError } = courseApi.useGetCourseByIdQuery(Number(course));

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
