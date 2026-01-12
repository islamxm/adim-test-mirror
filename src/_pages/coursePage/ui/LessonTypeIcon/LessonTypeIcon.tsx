import { FC } from "react";

import { BookOpenIcon, PlayIconRound } from "@/shared/ui/icons";

import { Lesson } from "@/entities/lesson";

type Props = Pick<Lesson, "type">;

export const LessonTypeIcon: FC<Props> = ({ type }) => {
  if (type === "BLOG") return <BookOpenIcon sx={{ fontSize: "2.4rem" }} />;
  if (type === "VIDEO") return <PlayIconRound sx={{ fontSize: "2.4rem" }} />;
  return null;
};
