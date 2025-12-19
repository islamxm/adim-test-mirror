"use client";
import { courseApi } from "@/entities/course";
import { Stack } from "@mui/material";
import { useParams } from "next/navigation";
import { UnitPart } from "../UnitPart/UnitPart";
import { motion } from "motion/react";

export const UnitsList = () => {
  const { course } = useParams();
  const { data, isError } = courseApi.useGetCourseByIdQuery(Number(course));

  if (!data || isError) {
    return null;
  }

  const units = data.units;

  return (
    <Stack
      sx={{overflowY: "auto"}}
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
