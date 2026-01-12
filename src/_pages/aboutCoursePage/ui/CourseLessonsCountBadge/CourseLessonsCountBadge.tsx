import { FC } from "react";

import { Stack, Typography } from "@mui/material";

import { BookIcon } from "@/shared/ui/icons";

import { Course } from "@/entities/course";

type Props = Pick<Course, "totalLessonsCount">;

export const CourseLessonsCountBadge: FC<Props> = ({ totalLessonsCount }) => {
  return (
    <Stack gap={"1.2rem"} direction={"row"} alignItems={"flex-start"}>
      <BookIcon
        sx={(theme) => ({
          fontSize: "2.4rem",
          verticalAlign: "top",
          color: theme.palette.text.disabled,
        })}
      />
      <Typography
        sx={(theme) => ({
          fontSize: "1.8rem",
          color: theme.palette.text.disabled,
        })}
      >
        {totalLessonsCount} {totalLessonsCount > 1 ? "lessons" : "lesson"}
      </Typography>
    </Stack>
  );
};
