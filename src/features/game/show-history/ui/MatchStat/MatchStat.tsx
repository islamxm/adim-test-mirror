import { FC, useState } from "react";

import { Box, Grid, Stack } from "@mui/material";
import { AnimatePresence, motion } from "motion/react";

import {
  Player,
  PlayerName,
  QuestionResult,
  QuestionResultSkeleton,
  competitionApi,
  getMatchResultStatusFromWinnerId,
} from "@/entities/competition";
import { userApi } from "@/entities/user";

import { HistoryMatchData } from "../../model";
import { MatchResultTitle } from "../MatchResultTitle/MatchResultTitle";

export const MatchStat: FC<HistoryMatchData> = ({ id, opponent, winnerId }) => {
  const { data, isLoading, isError } = competitionApi.useGetMatchDetailsQuery({ id });
  const { data: selfData } = userApi.useGetUserProfileQuery({});
  const [activePlayer, setActivePlayer] = useState<number | undefined>(selfData?.id);

  const { answers, opponentAnswers } = data || {};

  return (
    <Box
      sx={{
        height: "100%",
        width: "100%",
        position: "absolute",
        top: 0,
        left: 0,
        backgroundColor: "#fff",
        zIndex: 2,
        overflowY: "auto",
        pb: "4rem",
      }}
      component={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Stack sx={{ maxWidth: "40rem", width: "100%", margin: "0 auto" }} gap={"4rem"}>
        <Grid container spacing={"1rem"}>
          <Grid size={6}>
            <motion.div
              onClick={() => setActivePlayer(selfData?.id)}
              style={{ cursor: "pointer" }}
              variants={{
                active: { scale: 1 },
                disabled: { scale: 0.8 },
              }}
              animate={activePlayer === selfData?.id ? "active" : "disabled"}
              transition={{ ease: "circInOut", duration: 0.2 }}
            >
              <Player
                avatarProps={{
                  size: "12.4rem",
                  avatarUrl: selfData?.avatarUrl,
                  isDisabled: activePlayer !== selfData?.id,
                  shadowType: "dark",
                  isActive: activePlayer === selfData?.id,
                }}
                extraContent={
                  <Stack gap={"1rem"}>
                    <PlayerName profileName={selfData?.profileName} />
                    <MatchResultTitle
                      status={getMatchResultStatusFromWinnerId(winnerId, selfData?.id)}
                    />
                  </Stack>
                }
              />
            </motion.div>
          </Grid>
          <Grid size={6}>
            <motion.div
              onClick={() => setActivePlayer(opponent?.id)}
              style={{ cursor: "pointer" }}
              variants={{
                active: { scale: 1 },
                disabled: { scale: 0.8 },
              }}
              animate={activePlayer === opponent?.id ? "active" : "disabled"}
              transition={{ ease: "circInOut", duration: 0.2 }}
            >
              <Player
                avatarProps={{
                  size: "12.4rem",
                  avatarUrl: opponent?.avatarUrl,
                  isDisabled: activePlayer !== opponent?.id,
                  shadowType: "dark",
                  isActive: activePlayer === opponent?.id,
                }}
                extraContent={
                  <Stack gap={"1rem"}>
                    <PlayerName profileName={opponent?.profileName} />
                    <MatchResultTitle
                      status={getMatchResultStatusFromWinnerId(winnerId, opponent.id)}
                    />
                  </Stack>
                }
              />
            </motion.div>
          </Grid>
        </Grid>
        <AnimatePresence mode={"wait"}>
          {isLoading && (
            <Stack
              component={motion.div}
              initial={{ opacity: 0 }}
              exit={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              gap={"1.2rem"}
            >
              <QuestionResultSkeleton />
              <QuestionResultSkeleton />
              <QuestionResultSkeleton />
            </Stack>
          )}
          {data && !isLoading && (
            <>
              {activePlayer === selfData?.id && (
                <Stack
                  component={motion.div}
                  initial={{ opacity: 0 }}
                  exit={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  gap={"1.2rem"}
                  key={"self-answers"}
                >
                  {answers?.map((item) => (
                    <QuestionResult
                      key={item.questionId}
                      elapsedMs={item.elapsedMs}
                      isCorrect={item.isCorrect}
                      stem={item.stem}
                      answer={item.answer}
                    />
                  ))}
                </Stack>
              )}
              {activePlayer !== selfData?.id && (
                <Stack
                  component={motion.div}
                  initial={{ opacity: 0 }}
                  exit={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  gap={"1.2rem"}
                  key={"opponent-answers"}
                >
                  {opponentAnswers?.map((item) => (
                    <QuestionResult
                      key={item.questionId}
                      elapsedMs={item.elapsedMs}
                      isCorrect={item.isCorrect}
                      stem={item.stem}
                      answer={item.answer}
                    />
                  ))}
                </Stack>
              )}
            </>
          )}
        </AnimatePresence>
      </Stack>
    </Box>
  );
};
