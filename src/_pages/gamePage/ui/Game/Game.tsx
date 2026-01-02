import { Box } from "@mui/material";
import { motion } from "motion/react";
import { useGame } from "../../lib/useGame";
import { GameStatus } from "../../model";
import { ReactNode } from "react";
import { LobbyView } from "../views/LobbyView/LobbyView";
import { SearchView } from "../views/SearchView/SearchView";
import { WaitView } from "../views/WaitView/WaitView";
import { ReadyView } from "../views/ReadyView/ReadyView";
import { StartView } from "../views/StartView/StartView";
import { WaitResultView } from "../views/WaitResultView/WaitResultView";
import { ResultView } from "../views/ResultView/ResultView";
import { OfflineScreen } from "../OfflineScreen/OfflineScreen";
import { userApi } from "@/entities/user";

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
    isConnected,

    enterQueue,
    compete,
    nextOpponent,
    submitAnswer,
    setGameStatus,
  } = useGame();

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
    WAIT_RESULT: (
      <WaitResultView
        selfData={selfData}
        result={result}
        opponentData={opponentData}
      />
    ),
    RESULT: <ResultView selfData={selfData} winnerId={result?.winner} />,
  };

  const activeView = views[gameStatus];

  return (
    <Box sx={{ height: "100%", position: "relative" }}>
      {!isConnected && <OfflineScreen />}
      <Box
        sx={{ height: "100%", maxWidth: "99.4rem", width: "100%", m: "0 auto" }}
        component={motion.div}
        layout
      >
        {activeView}
      </Box>
    </Box>
  );
};
