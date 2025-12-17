import { Course } from "@/entities/course"
import { Box } from "@mui/material"
import { FC } from "react";
import htmlParser from 'html-react-parser';

type Props = Pick<Course, "explanation">;

export const RestInfo:FC<Props> = ({explanation}) => {
  return (
    <Box sx={{width: "100%", p: "4rem 1rem 0 0"}}>
      {explanation && htmlParser(explanation)}
    </Box>
  )
}