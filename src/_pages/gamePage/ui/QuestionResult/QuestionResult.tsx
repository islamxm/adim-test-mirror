import { Answer } from "@/entities/competition"
import { Paper, Stack, Typography } from "@mui/material"
import { FC } from "react"

type Props = Answer

export const QuestionResult:FC<Props> = ({
  answer,
  question,
  elapsedMs
}) => {
  
  const elapsedSecs = (elapsedMs / 1000).toFixed(3);

  return (
    <Paper elevation={0} sx={{p: "2.5rem"}}>
      <Stack gap={".5rem"}>
        <Typography variant="h3">{question.stem}</Typography>
        <Typography>{answer}</Typography>
        <Typography sx={theme => ({color: theme.palette.primary.light})}>answer time: {elapsedSecs}s</Typography>
      </Stack>
    </Paper>  
  )
}