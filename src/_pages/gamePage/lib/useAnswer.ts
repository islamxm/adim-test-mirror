import { useEffect, useRef, useState } from "react";

import { CnServerEventsMap } from "@/entities/competition";

const avilableKeys = new Set<string>(["1", "2", "3", "4", "Enter"]);

export const useAnswer = (
  question?: CnServerEventsMap["NEXT_QUESTION"],
  onSubmitAnswer?: (key: string, ms: number) => void,
) => {
  const [answer, setAnswer] = useState<Array<string>>([]);
  const [prevQuestionId, setPrevQuestionId] = useState<number | undefined>(question?.question.id);

  if (question?.question.id !== prevQuestionId) {
    setPrevQuestionId(question?.question.id);
    setAnswer([]);
  }
  const time = useRef<number>(0);

  const questionRef = useRef(question);
  const answerRef = useRef(answer);
  const onSubmitAnswerRef = useRef(onSubmitAnswer);

  useEffect(() => {
    answerRef.current = answer;
  }, [answer]);

  useEffect(() => {
    questionRef.current = question;
  }, [question]);

  useEffect(() => {
    onSubmitAnswerRef.current = onSubmitAnswer;
  }, [onSubmitAnswer]);

  const onChangeAnswer = (key: string) => {
    const currentQuestion = questionRef.current;

    if (currentQuestion?.question.type === "Multiple_Choice") {
      setAnswer((s) => {
        if (s.find((k) => k === key)) {
          return s.filter((k) => k !== key);
        }
        return [...s, key];
      });
    }
    if (currentQuestion?.question.type === "Single_Choice") {
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
    onSubmitAnswerRef.current?.(keys, delta);
  };

  const onChangeAnswerRef = useRef(onChangeAnswer);
  useEffect(() => {
    onChangeAnswerRef.current = onChangeAnswer;
  });

  const onSubmitRef = useRef(onSubmit);
  useEffect(() => {
    onSubmitRef.current = onSubmit;
  });

  const onKeyDown = (e: KeyboardEvent) => {
    const currentQuestion = questionRef.current;
    if (!currentQuestion || !avilableKeys.has(e.key)) {
      return;
    }
    const variantNumber = Number(e.key);
    if (isNaN(variantNumber)) {
      if (e.key === "Enter") {
        onSubmitRef.current();
      }
    } else {
      const answeredQuestion = currentQuestion.question.choices[variantNumber - 1];
      if (answeredQuestion) {
        onChangeAnswerRef.current(answeredQuestion.key);
      }
    }
  };

  useEffect(() => {
    if (!question) {
      return;
    }
    time.current = Date.now();
  }, [question]);

  useEffect(() => {
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
