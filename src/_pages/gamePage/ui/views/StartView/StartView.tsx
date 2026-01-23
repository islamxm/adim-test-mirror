import { FC, useEffect, useRef, useState } from "react";

import { Stack } from "@mui/material";
import { AnimatePresence, motion } from "motion/react";

import { YellowButton } from "@/shared/ui";
import { ArrowRightIcon } from "@/shared/ui/icons";

import { CnServerEventsMap } from "@/entities/competition";
import { PlayerStatusType } from "@/entities/competition";
import { User } from "@/entities/user";

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
};

export const StartView: FC<Props> = ({
  opponentData,
  question,
  onSubmitAnswer,
  selfData,
  opponentStatus,
  selfStatus,
}) => {
  const [answer, setAnswer] = useState<Array<string>>([]);
  const time = useRef<number>(0);

  useEffect(() => {
    if (!question) {
      return;
    }
    time.current = Date.now();
    setAnswer([]);
  }, [question]);

  if (!question) {
    return null;
  }

  const onChangeAnswer = (key: string) => {
    if (question.question.type === "Multiple_Choice") {
      setAnswer((s) => {
        if (s.find((k) => k === key)) {
          return s.filter((k) => k !== key);
        }
        return [...s, key];
      });
    }
    if (question.question.type === "Single_Choice") {
      setAnswer((s) => {
        if (s.find((k) => k === key)) {
          return s.filter((k) => k !== key);
        }
        return [key];
      });
    }
  };

  const onSubmit = (ms?: number) => {
    const delta = ms || Date.now() - time.current;
    const keys = answer.join(",");
    onSubmitAnswer?.(keys, delta);
  };

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
                  <Variant
                    key={choice.key}
                    variant={choice.key}
                    value={choice.value}
                    isActive={!!answer.find((k) => k === choice.key)}
                    onChange={() => onChangeAnswer(choice.key)}
                  />
                ))}
              </Question>
            </motion.div>
          </AnimatePresence>

          <Stack direction={"row"} justifyContent={"flex-end"}>
            <YellowButton
              onClick={() => onSubmit()}
              disabled={answer.length === 0}
              endIcon={<ArrowRightIcon />}
            >
              Continue
            </YellowButton>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};
