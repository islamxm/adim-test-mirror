import { FC, useEffect } from "react";

import { winnerConfettiRun } from "@/animations/winner-confetti";
import { Grid, Stack } from "@mui/material";
import { motion } from "motion/react";

import { YellowButton } from "@/shared/ui";
import { ArrowRightIcon } from "@/shared/ui/icons";

import { CnServerEventsMap, getGameResult } from "@/entities/competition";
import { User } from "@/entities/user";

import { GameStatus, PlayerStatus } from "@/_pages/gamePage/model";

import { GameHeader } from "../../GameHeader/GameHeader";
import { ResultList } from "../../ResultList/ResultList";
import { ResultListLoading } from "../../ResultList/ResultList.loading";

type Props = {
  gameStatus: GameStatus;
  resultData?: {
    winner?: number | null;
    selfResult: CnServerEventsMap["RESULT"]["answers"];
    opponentResult?: CnServerEventsMap["RESULT"]["opponentAnswers"];
  };
  onGoBack?: () => void;
  onPlay?: () => void;
  selfData?: User;
  opponentData?: any;
  opponentStatus?: PlayerStatus;
  selfStatus?: PlayerStatus;
};

export const ResultView: FC<Props> = ({
  resultData,
  selfData,
  opponentData,
  opponentStatus,
  selfStatus,
  gameStatus,
}) => {
  return (
    <Stack gap={"3rem"} sx={{ height: "100%" }}>
      <Stack gap={"5rem"} alignItems={"center"} component={motion.div}>
        <GameHeader
          opponentData={opponentData}
          selfData={selfData}
          opponentStatus={opponentStatus}
          selfStatus={selfStatus}
        />
        <Stack sx={{ height: "100%", width: "100%" }} gap={"2rem"}>
          <Grid container direction={"row"} spacing={"10rem"}>
            <Grid size={6}>
              <ResultList list={resultData?.selfResult || []} />
            </Grid>

            <Grid size={6}>
              {gameStatus === "WAIT_RESULT" ? (
                <ResultListLoading />
              ) : (
                <ResultList list={resultData?.opponentResult || []} />
              )}
            </Grid>
          </Grid>

          <Stack direction={"row"} justifyContent={"flex-end"}>
            <YellowButton endIcon={<ArrowRightIcon />}>На главную</YellowButton>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};
