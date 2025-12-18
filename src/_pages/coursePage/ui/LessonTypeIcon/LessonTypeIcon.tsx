import { Lesson } from "@/entities/lesson";
import { BookOpenIcon, PlayIconRound } from "@/shared/ui/icons";
import { FC } from "react";

type Props = Pick<Lesson, "type">;

export const LessonTypeIcon: FC<Props> = ({ type }) => {
  if (type === "BLOG") return <BookOpenIcon sx={{ fontSize: "2.4rem" }} />;
  if (type === "VIDEO") return <PlayIconRound sx={{ fontSize: "2.4rem" }} />;
  return null;
};
