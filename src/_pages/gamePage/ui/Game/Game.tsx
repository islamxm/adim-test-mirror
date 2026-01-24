import { ReactNode, useEffect } from "react";

import { useCanvasConfetti } from "@/animations/winner-confetti";
import { Box } from "@mui/material";
import { AnimatePresence } from "motion/react";

import { userApi } from "@/entities/user";

import { useGame } from "../../lib/useGame";
import { GameStatus } from "../../model";
import { BgBlue } from "../BgBlue/BgBlue";
import { BgRed } from "../BgRed/BgRed";
import { LobbyView } from "../views/LobbyView/LobbyView";
import { ReadyView } from "../views/ReadyView/ReadyView";
import { ResultView } from "../views/ResultView/ResultView";
import { SearchView } from "../views/SearchView/SearchView";
import { StartView } from "../views/StartView/StartView";
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
    isSubmittingAnswer,
  } = useGame();

  const { confettiCanvasRef, confettiRun } = useCanvasConfetti();

  const isDoubleBg = gameStatus !== "LOBBY";

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
        isSubmittingAnswer={isSubmittingAnswer}
      />
    ),
    // продумать обьединение двух gameState в один под названием RESULT
    WAIT_RESULT: (
      <ResultView
        gameStatus={gameStatus}
        opponentData={opponentData}
        opponentStatus={opponentStatus}
        selfStatus={selfStatus}
        selfData={selfData}
        resultData={result}
      />
    ),
    RESULT: (
      <ResultView
        gameStatus={gameStatus}
        opponentData={opponentData}
        opponentStatus={opponentStatus}
        selfStatus={selfStatus}
        selfData={selfData}
        resultData={result}
      />
    ),
  };

  const activeView = views[gameStatus];

  // сырая часть - проработать
  useEffect(() => {
    if (gameStatus === "RESULT" && selfStatus) {
      if (selfStatus === "WIN") {
        new Array(3).fill(1).forEach(() => {
          confettiRun(0.35, {
            angle: 315,
            origin: { y: -0.1, x: -0.1 },
          });
        });
      }
      if (selfStatus === "LOSE") {
        new Array(3).fill(1).forEach(() => {
          confettiRun(0.35, {
            angle: 225,
            origin: { y: -0.1, x: 1.1 },
          });
        });
      }
    }
  }, [gameStatus, result, selfStatus, confettiRun]);

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
      >
        <AnimatePresence>
          <BgBlue isDoubleBg={isDoubleBg} />
          {isDoubleBg && <BgRed />}
        </AnimatePresence>
        <Box
          sx={{
            position: "relative",
            height: "100%",
            zIndex: 2,
          }}
        >
          <canvas
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              // top: 0,
              // left: 0,
              pointerEvents: "none",
              zIndex: 2,
            }}
            ref={confettiCanvasRef}
          />
          <Box sx={{ height: "100%", width: "100%" }}>{activeView}</Box>
        </Box>
      </Box>
    </Box>
  );
};
