"use client";
import { FC } from "react";

import { useTranslations } from "next-intl";

import { Box, Button, Stack } from "@mui/material";

import { Container } from "@/shared/ui/Container";
import { SectionHead } from "@/shared/ui/SectionHead";
import { ArrowRightIcon } from "@/shared/ui/icons";

import { Course, CourseCard } from "@/entities/course";

type Props = {
  data: Array<Course>;
};

export const CoursesSection: FC<Props> = ({ data }) => {
  const t = useTranslations("pages.homePage.CoursesSection");

  return (
    <Box
      sx={(theme) => ({
        py: "3.5rem",
        backgroundColor: theme.palette.background.default,
      })}
    >
      <Container>
        <SectionHead
          title={t("title")}
          subtitle={t("subtitle")}
          action={
            <Button variant={"contained"} endIcon={<ArrowRightIcon />}>
              {t("more_button")}
            </Button>
          }
        />
        <Stack direction={"row"} gap={"20px"}>
          {data.map((course) => (
            <CourseCard key={course.id} {...course} />
          ))}
        </Stack>
      </Container>
    </Box>
  );
};
