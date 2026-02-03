import { useEffect, useRef, useState } from "react";

import { CnServerEventsMap } from "@/entities/competition";

const avilableKeys = new Set<string>(["1", "2", "3", "4", "Enter"]);

export const useAnswer = (
  question?: CnServerEventsMap["NEXT_QUESTION"],
  onSubmitAnswer?: (key: string, ms: number) => void,
) => {
  const [answer, setAnswer] = useState<Array<string>>([]);
  const time = useRef<number>(0);
  const questionRef = useRef<any>(question);
  const answerRef = useRef<any>(answer);

  useEffect(() => {
    answerRef.current = answer;
  }, [answer]);
  useEffect(() => {
    questionRef.current = question;
  }, [question]);

  const onChangeAnswer = (key: string) => {
    if (question?.question.type === "Multiple_Choice") {
      setAnswer((s) => {
        if (s.find((k) => k === key)) {
          return s.filter((k) => k !== key);
        }
        return [...s, key];
      });
    }
    if (question?.question.type === "Single_Choice") {
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
    const keys = answerRef.current.join(",");
    onSubmitAnswer?.(keys, delta);
  };

  const onKeyDown = (e: KeyboardEvent) => {
    const currentQuestion = questionRef.current;
    if (!currentQuestion || !avilableKeys.has(e.key)) {
      return;
    }
    const variantNumber = Number(e.key);
    if (isNaN(variantNumber)) {
      onSubmit();
    } else {
      const answeredQuestion = currentQuestion.question.choices[variantNumber - 1];
      console.log(currentQuestion.question.choices);
      console.log(answeredQuestion);
      if (answeredQuestion) {
        onChangeAnswer(answeredQuestion.key);
      }
    }
  };

  useEffect(() => {
    if (!question) {
      return;
    }
    time.current = Date.now();
    setAnswer([]);
  }, [question]);

  useEffect(() => {
    // window.removeEventListener("keydown", onKeyDown);
    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  return {
    answer,
    onChangeAnswer,
    onSubmit,
  };
};
