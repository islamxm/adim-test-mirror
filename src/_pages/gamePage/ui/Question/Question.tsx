import { CnServerEventsMap } from "@/entities/competition";
import { MultipleChoiceIcon } from "@/shared/ui/icons";
import { Box, Paper, Stack, Typography } from "@mui/material";
import { FC, PropsWithChildren } from "react";

type Props = PropsWithChildren<{
  question: CnServerEventsMap['NEXT_QUESTION']
}>;

export const Question: FC<Props> = ({ children, question }) => {
  return (
    <Stack gap={"2rem"}>
      <Paper elevation={0} sx={{ minHeight: "14.2rem", p: "2.5rem" }}>
        <Stack gap={"1rem"}>
          <Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"}>
            <Typography variant="h3">Question {question.questionOrder}/{question.totalQuestionCount}</Typography>
            { !!(question.question.type === "Multiple_Choice") && <MultipleChoiceIcon sx={{fontSize: "2.4rem"}}/>}
          </Stack>
          <Typography sx={{ fontSize: "1.8rem", fontWeight: 600 }}>
            {question.question.stem}
          </Typography>
        </Stack>
      </Paper>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gridTemplateRows: "1fr",
          gap: "2rem",
        }}
      >
        {children}
      </Box>
    </Stack>
  );
};
