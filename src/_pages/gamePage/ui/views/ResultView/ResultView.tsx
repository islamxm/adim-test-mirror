import { FC, useEffect } from "react";

import { winnerConfettiRun } from "@/animations/winner-confetti";
import { Stack } from "@mui/material";
import { motion } from "motion/react";

import { YellowButton } from "@/shared/ui";
import { ArrowRightIcon } from "@/shared/ui/icons";

import { CnServerEventsMap, getGameResult } from "@/entities/competition";
import { User } from "@/entities/user";

import { PlayerStatus } from "@/_pages/gamePage/model";

import { GameHeader } from "../../GameHeader/GameHeader";
import { ResultList } from "../../ResultList/ResultList";

type Props = {
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
          <Stack direction={"row"} gap={"10rem"}>
            <ResultList list={resultData?.selfResult || []} />
            <ResultList list={resultData?.opponentResult || []} />
          </Stack>

          <Stack direction={"row"} justifyContent={"flex-end"}>
            <YellowButton endIcon={<ArrowRightIcon />}>На главную</YellowButton>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};
