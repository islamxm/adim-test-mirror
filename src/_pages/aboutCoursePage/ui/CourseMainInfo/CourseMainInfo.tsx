"use client";
import { Course } from "@/entities/course";
import { Container } from "@/shared/ui";
import { Box, Stack, Typography } from "@mui/material";
import { FC } from "react";

type Props = Pick<Course, "name" | "description">;

export const CourseMainInfo: FC<Props> = ({name, description}) => {
  
  return (
    <Box sx={{minHeight: "28rem"}}>
      <Container>
        <Stack gap={"4.4rem"} sx={{maxWidth: "calc(100% - 46.7rem)"}}>
          <Typography variant={"h2"}>{name}</Typography>
          <Typography sx={{fontSize: "1.8rem"}}>
            {description}
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
};
