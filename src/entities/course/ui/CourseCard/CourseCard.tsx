import { FC } from "react";

import Image from "next/image";
import Link from "next/link";

import { Box, Paper, Stack, Typography } from "@mui/material";
import { motion } from "motion/react";

import { getLanguageName } from "@/shared/lib";
import { Language, getAboutCoursePage } from "@/shared/model";

import { Course } from "../../model";
import { InfoChip } from "../InfoChip/InfoChip";

export const CourseCard: FC<
  Pick<Course, "name" | "id" | "image" | "totalLessonsCount" | "languages"> &
    Partial<Pick<Course, "description">>
> = ({ name, description, totalLessonsCount, languages, id, image }) => {
  return (
    <Box component={Link} href={getAboutCoursePage(id)} sx={{ flex: 1 }}>
      <Paper
        elevation={0}
        component={motion.div}
        sx={(theme) => ({
          height: "21.5rem",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          color: theme.palette.primary.main,
          position: "relative",
          p: "1.6rem",
          justifyContent: "space-between",
          borderRadius: "2.4rem",
        })}
        whileHover={{
          scale: 1.05,
          zIndex: 2,
        }}
      >
        <Stack gap={"1rem"}>
          <Box
            sx={{
              height: "6.6rem",
              width: "6.6rem",
              "& img": { width: "100%", height: "100%", objectFit: "contain" },
            }}
          >
            {image && <Image src={image} width={66} height={66} alt="" />}
          </Box>
          <Typography variant="h4" sx={{ fontWeight: 600, fontSize: "2.4rem" }}>
            {name}
          </Typography>
        </Stack>
        <Stack flexWrap={"wrap"} gap={".4rem"} direction={"row"}>
          {totalLessonsCount > 0 && (
            <InfoChip
              value={`${totalLessonsCount} ${totalLessonsCount > 1 ? "lessons" : "lesson"}`}
              type={"lessons_count"}
            />
          )}

          {languages.length > 0 &&
            languages.map((language) => (
              <InfoChip
                value={getLanguageName(language as Language)}
                type={"language"}
                key={language}
              />
            ))}
        </Stack>
      </Paper>
    </Box>
  );
};
