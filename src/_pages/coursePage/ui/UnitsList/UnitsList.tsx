"use client";
import { courseApi } from "@/entities/course"
import { Stack } from "@mui/material";
import { useParams } from "next/navigation"
import { UnitPart } from "../UnitPart/UnitPart";

export const UnitsList = () => {
  const {course} = useParams();
  const {data, isError} = courseApi.useGetCourseByIdQuery(Number(course))

  if(!data || isError) {
    return null;
  }

  const units = data.units

  return (
    <Stack>
      {
        units.map(unit => (
          <UnitPart
            key={unit.id}
            {...unit}
            />
        ))
      }
    </Stack>
  )
}