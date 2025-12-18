import { Button, Paper, Stack, Typography } from "@mui/material";
import Image from "next/image";
import pl from "../../../../../public/course-img.png";
import { Course } from "@/entities/course";
import { FC } from "react";
import { CourseLanguagesBadge } from "../CourseLanguagesBadge/CourseLanguagesBadge";
import { getCoursePage, getMainCoursePage, Language } from "@/shared/model";
import { CourseLessonsCountBadge } from "../CourseLessonsCountBadge/CourseLessonsCountBadge";
import Link from "next/link";
import { objectToSearchParams } from "@/shared/lib";

type Props = Pick<Course, "image" | "id" | "languages" | "totalLessonsCount">;

export const CourseDetailsCard:FC<Props> = ({
  image,
  id,
  languages,
  totalLessonsCount
}) => {
  return (
    <Paper
      elevation={1}
      sx={{
        width: "46.7rem",
        p: "2.4rem",
        height: "73.9rem",
        borderRadius: "1.8rem",
      }}
    >
      <Stack gap={"1.6rem"}>
        <Paper
          sx={{ height: "28rem", borderRadius: "1.4rem", overflow: "hidden" }}
        >
          <Image
            style={{ objectFit: "cover" }}
            src={image || pl}
            width={419}
            height={280}
            alt=""
          />
        </Paper>
        <Button variant={"contained"} component={Link} href={getMainCoursePage(id) + objectToSearchParams({tab: "units"})}>Start now</Button>
        <Stack gap={"1.6rem"}>
          <Typography sx={{fontSize: "1.8rem", fontWeight: 600}}>Course includes</Typography>
          <CourseLanguagesBadge languages={languages as Array<Language>}/>
          <CourseLessonsCountBadge totalLessonsCount={totalLessonsCount}/>
        </Stack>
      </Stack>
    </Paper>
  );
};
