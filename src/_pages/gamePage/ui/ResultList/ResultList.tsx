import { FC } from "react";

import { Box, Paper, Stack, Typography } from "@mui/material";

import { CheckIcon, CloseIcon, CloseThinIcon } from "@/shared/ui/icons";

import { Answer, CnServerEventsMap } from "@/entities/competition";

type Props = {
  list: CnServerEventsMap["RESULT"]["answers"];
};

export const ResultList: FC<Props> = ({ list }) => {
  return (
    <Paper
      sx={{
        p: "1.6rem 2rem",
        height: "calc(100vh - 460px)",
        overflowY: "auto",
        borderRadius: "3.4rem",
      }}
      elevation={0}
    >
      <Stack gap={"1.6rem"}>
        {list.map((item) => {
          const { elapsedMs, isCorrect, question, answer } = item;
          const answerKey = question.choices.find((f) => f.value === answer);
          return (
            <Stack
              key={question.id}
              direction={"row"}
              justifyContent={"space-between"}
              alignItems={"flex-end"}
              gap={"1.6rem"}
              sx={{ border: "2px solid #ECECEC", p: "1.2rem 2rem", borderRadius: "1.8rem" }}
            >
              <Stack gap={".4rem"}>
                <Typography variant="h5" sx={{ fontSize: "1.6rem" }}>
                  {question.stem}
                </Typography>
                <Stack gap={"1rem"}>
                  <Typography sx={{ fontSize: "1.6rem" }}>
                    <strong>{answerKey?.key || "No answer"})</strong> {answerKey?.value}
                  </Typography>
                  <Typography
                    sx={(theme) => ({ fontSize: "1.2rem", color: theme.palette.primary.light })}
                  >
                    время ответа : {elapsedMs} мс
                  </Typography>
                </Stack>
              </Stack>
              <Box sx={{ flex: "0 0 auto", width: "3.2rem", height: "3.2rem" }}>
                {isCorrect ? (
                  <CheckIcon sx={{ color: "green", fontSize: "3.2rem" }} />
                ) : (
                  <CloseThinIcon sx={{ color: "red", fontSize: "3.2rem" }} />
                )}
              </Box>
            </Stack>
          );
        })}
      </Stack>
    </Paper>
  );
};
