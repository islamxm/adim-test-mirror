import { FC, useState } from "react";

import { useParams } from "next/navigation";

import { Stack } from "@mui/material";
import { AnimatePresence, motion } from "motion/react";

import { Unit } from "@/entities/unit";

import { LessonItem } from "../LessonItem/LessonItem";
import { UnitHead } from "../UnitHead/UnitHead";

type Props = Unit & {};

export const UnitPart: FC<Props> = ({ name, isFinished, id, lessons }) => {
  const { unit: unitId, lesson: lessonId } = useParams();
  const [isLessonsOpen, setIsLessonsOpen] = useState(Number(unitId) === id);
  const isActive =
    Number(unitId) === id && Boolean(lessons.find((lesson) => lesson.id === Number(lessonId)));

  return (
    <Stack>
      <UnitHead
        id={id}
        name={name}
        isFinished={isFinished}
        isOpened={isLessonsOpen}
        isActive={isActive}
        toggleLessons={() => setIsLessonsOpen((s) => !s)}
      />
      <AnimatePresence>
        {isLessonsOpen && (
          <Stack
            component={motion.div}
            initial={{ height: 0 }}
            exit={{ height: 0 }}
            animate={{ height: "auto" }}
            sx={{ overflow: "hidden" }}
          >
            {lessons.map((lesson) => (
              <LessonItem key={lesson.id} {...lesson} />
            ))}
          </Stack>
        )}
      </AnimatePresence>
    </Stack>
  );
};
