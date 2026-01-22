import { FC } from "react";

import { Paper, Stack, Typography } from "@mui/material";

import { Answer } from "@/entities/competition";

type Props = Answer;

export const QuestionResult: FC<Props> = ({ answer, question, elapsedMs, stem }) => {
  const elapsedSecs = (elapsedMs / 1000).toFixed(3);

  return (
    <Paper elevation={0} sx={{ p: "2.5rem" }}>
      <Stack gap={".5rem"}>
        <Typography variant="h3">{stem}</Typography>
        <Typography>{answer}</Typography>
        <Typography sx={(theme) => ({ color: theme.palette.primary.light })}>
          answer time: {elapsedSecs}s
        </Typography>
      </Stack>
    </Paper>
  );
};
