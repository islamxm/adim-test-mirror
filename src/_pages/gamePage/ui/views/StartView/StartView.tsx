import { FC } from "react";

import { Grid, Stack } from "@mui/material";
import { AnimatePresence, motion } from "motion/react";

import { YellowButton } from "@/shared/ui";
import { ArrowRightIcon } from "@/shared/ui/icons";

import { CnServerEventsMap } from "@/entities/competition";
import { PlayerStatusType } from "@/entities/competition";
import { User } from "@/entities/user";

import { useAnswer } from "@/_pages/gamePage/lib/useAnswer";

import { GameHeader } from "../../GameHeader/GameHeader";
import { Question } from "../../Question/Question";
import { Variant } from "../../Variant/Variant";

type Props = {
  opponentData: any;
  question?: CnServerEventsMap["NEXT_QUESTION"];
  onSubmitAnswer?: (key: string, ms: number) => void;
  selfData?: User;
  opponentStatus?: PlayerStatusType;
  selfStatus?: PlayerStatusType;
  isSubmittingAnswer?: boolean;
  isConnected?: boolean;
};

export const StartView: FC<Props> = ({
  opponentData,
  question,
  onSubmitAnswer,
  selfData,
  opponentStatus,
  selfStatus,
  isSubmittingAnswer,
  isConnected,
}) => {
  const { answer, onChangeAnswer, onSubmit } = useAnswer(question, onSubmitAnswer);

  if (!question) {
    return null;
  }

  return (
    <Stack gap={"3rem"} sx={{ height: "100%" }}>
      <Stack gap={"10rem"} alignItems={"center"} component={motion.div}>
        <GameHeader
          onComplete={onSubmit}
          opponentData={opponentData}
          question={question}
          selfData={selfData}
          opponentStatus={opponentStatus}
          selfStatus={selfStatus}
        />
        <Stack sx={{ height: "100%", width: "100%" }} gap={"2rem"}>
          <AnimatePresence mode="popLayout">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.1 }}
              key={question.question.id}
            >
              <Question question={question}>
                {question.question.choices.map((choice) => (
                  <Grid key={choice.value} size={6}>
                    <Variant
                      variant={choice.key}
                      value={choice.value}
                      isActive={!!answer.find((k) => k === choice.key)}
                      onChange={() => onChangeAnswer(choice.key)}
                    />
                  </Grid>
                ))}
              </Question>
            </motion.div>
          </AnimatePresence>
          <Stack direction={"row"} justifyContent={"flex-end"}>
            <YellowButton
              onClick={() => onSubmit()}
              disabled={answer.length === 0 || !isConnected}
              endIcon={<ArrowRightIcon />}
              loading={isSubmittingAnswer}
            >
              Continue
            </YellowButton>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};
