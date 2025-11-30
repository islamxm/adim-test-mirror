"use client";
import { CourseCard } from "@/entities/course";
import { Container } from "@/shared/ui/Container";
import { ArrowRightIcon } from "@/shared/ui/icons";
import { SectionHead } from "@/shared/ui/SectionHead";
import { Box, Button, Stack } from "@mui/material";

export const CoursesSection = () => {
  return (
    <Box
      sx={theme => ({
        backgroundColor: theme.palette.common.white,
        py: "3.5rem"
      })}
      >
      <Container>
        <SectionHead
          title="Popular courses"
          subtitle="Lorem ipsum dolor sit amet consectetur. Facilisi sollicitudin tempus sit ac. Tellus ac cras in metus curabitur aliquet."
          action={
            <Button variant={"contained"} endIcon={<ArrowRightIcon />}>
              See all
            </Button>
          }
        />
        <Stack direction={"row"} gap={"20px"}>
          <CourseCard />
          <CourseCard />
          <CourseCard />
          <CourseCard />
        </Stack>
      </Container>
    </Box>
  );
};
