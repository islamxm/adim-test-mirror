import { ReactNode } from "react";

import { Box } from "@mui/material";
import { AnimatePresence, motion } from "motion/react";

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
      />
    ),
    WAIT_RESULT: <WaitResultView selfData={selfData} result={result} opponentData={opponentData} />,
    RESULT: (
      <ResultView
        opponentData={opponentData}
        opponentStatus={opponentStatus}
        selfStatus={selfStatus}
        selfData={selfData}
        resultData={result}
      />
    ),
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
          {activeView}
        </Box>
      </Box>
    </Box>
  );
};
