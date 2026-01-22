import { FC } from "react";

import { Box, Paper, Stack, Typography } from "@mui/material";
import { motion } from "motion/react";

import { CheckIcon, CloseThinIcon } from "@/shared/ui/icons";

import { CnServerEventsMap } from "@/entities/competition";
import { QuestionResult } from "@/entities/competition";

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
      component={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Stack gap={"1.6rem"}>
        {list.map((item, index) => (
          <QuestionResult
            key={index}
            elapsedMs={item.elapsedMs}
            answer={item.answer}
            isCorrect={item.isCorrect}
            stem={item.stem}
          />
        ))}
      </Stack>
    </Paper>
  );
};
