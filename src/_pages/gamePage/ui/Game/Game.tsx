import { ReactNode } from "react";

import { Box } from "@mui/material";
import { AnimatePresence, motion } from "motion/react";

import { userApi } from "@/entities/user";

import { useGame } from "../../lib/useGame";
import { GameStatus } from "../../model";
import { LobbyView } from "../views/LobbyView/LobbyView";
import { ReadyView } from "../views/ReadyView/ReadyView";
import { ResultView } from "../views/ResultView/ResultView";
import { SearchView } from "../views/SearchView/SearchView";
import { StartView } from "../views/StartView/StartView";
import { WaitResultView } from "../views/WaitResultView/WaitResultView";
import { WaitView } from "../views/WaitView/WaitView";

export const Game = () => {
  const { data: selfData } = userApi.useGetUserProfileQuery({});

  const {
    question,
    selfStatus,
    opponentStatus,
    opponentData,
    result,
    startCountdownSecs,
    gameStatus,
    // isConnected,
    enterQueue,
    compete,
    nextOpponent,
    submitAnswer,
    setGameStatus,
  } = useGame();

  const isDoubleBg = gameStatus !== "LOBBY" && gameStatus !== "RESULT";

  const views: Partial<Record<GameStatus, ReactNode>> = {
    LOBBY: <LobbyView selfData={selfData} selfStatus={selfStatus} onStartSearching={enterQueue} />,
    SEARCH: <SearchView selfData={selfData} selfStatus={selfStatus} />,
    WAIT: (
      <WaitView
        selfStatus={selfStatus}
        opponentStatus={opponentStatus}
        opponentData={opponentData}
        onReady={compete}
        onSkipPlayer={nextOpponent}
        selfData={selfData}
      />
    ),
    READY: (
      <ReadyView
        onComplete={() => setGameStatus("START")}
        opponentData={opponentData}
        startCountdownSecs={startCountdownSecs}
        selfData={selfData}
      />
    ),
    START: (
      <StartView
        onSubmitAnswer={submitAnswer}
        question={question}
        opponentData={opponentData}
        selfData={selfData}
      />
    ),
    WAIT_RESULT: <WaitResultView selfData={selfData} result={result} opponentData={opponentData} />,
    RESULT: <ResultView selfData={selfData} winnerId={result?.winner} />,
  };

  const activeView = views[gameStatus];

  return (
    <Box
      sx={{
        height: "100%",
        position: "relative",
      }}
    >
      <Box
        sx={{
          height: "100%",
          maxWidth: "99.4rem",
          width: "100%",
          m: "0 auto",
        }}
        component={motion.div}
        layout
      >
        <AnimatePresence>
          <Box
            sx={{
              position: "fixed",
              height: "100%",
              width: "100%",
              top: 0,
              left: 0,
              background:
                "linear-gradient(270deg,rgba(2, 120, 255, 0) 0%, rgba(2, 120, 255, 1) 50%, rgba(2, 120, 255, 0) 100%)",
            }}
            component={motion.div}
            initial={{ x: "0", opacity: 0 }}
            exit={{ x: "0", opacity: 0 }}
            // animate={{ x: 0, opacity: 1 }}
            transition={{
              ease: "circInOut",
              duration: 1,
            }}
            variants={{
              double: {
                x: "-40%",
                opacity: 1,
              },
              single: {
                x: "0",
                opacity: 1,
              },
            }}
            animate={isDoubleBg ? "double" : "single"}
          ></Box>
          {isDoubleBg && (
            <Box
              sx={{
                position: "fixed",
                height: "100%",
                width: "100%",
                top: 0,
                right: 0,
                background:
                  "linear-gradient(270deg,rgba(223, 2, 2, 0) 0%, rgba(223, 2, 2, 1) 50%, rgba(223, 2, 2, 0) 100%)",
              }}
              component={motion.div}
              initial={{ x: "100%", opacity: 0 }}
              exit={{ x: "100%", opacity: 0 }}
              animate={{ x: "40%", opacity: 1 }}
              transition={{
                ease: "circInOut",
                duration: 1,
              }}
            ></Box>
          )}
        </AnimatePresence>
        <Box
          sx={{
            position: "relative",
            height: "100%",
            zIndex: 2,
          }}
        >
          {activeView}
        </Box>
      </Box>
    </Box>
  );
};
