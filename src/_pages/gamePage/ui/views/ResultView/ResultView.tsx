import { Button, Stack } from "@mui/material";
import { motion } from "motion/react";
import { Player } from "../../Player/Player";
import { User, userApi } from "@/entities/user";
import { winnerConfettiRun } from "@/animations/winner-confetti";
import {
  CnServerEventsMap,
  getGameResult,
} from "@/entities/competition";
import { FC, useEffect } from "react";
import { LoseText } from "../../LoseText/LoseText";
import { WinText } from "../../WinText/WinText";
import { DraftText } from "../../DraftText/DraftText";

type Props = {
  winnerId?: CnServerEventsMap["RESULT"]["winnerId"];
  onGoBack?: () => void;
  onPlay?: () => void,
  selfData?: User
};

export const ResultView: FC<Props> = ({ winnerId, selfData }) => {
  const result = getGameResult(winnerId, selfData?.id);

  useEffect(() => {
    if (result === "WIN") {
      winnerConfettiRun();
    }
  }, [result]);

  if(result === undefined) {
    return null
  }

  return (
    <Stack component={motion.div} initial={{opacity: 0}} animate={{opacity: 1}} gap={"3rem"} justifyContent={"center"} sx={{ height: "100%" }}>
      <Stack
        alignItems={"flex-start"}
        direction={"row"}
        gap={"2rem"}
        justifyContent={"center"}
        component={motion.div}
      >
        <Stack alignItems={"center"}>
          <motion.div layoutId="player" layout="preserve-aspect">
            <Player
              data={{
                profileName: selfData?.profileName,
                avatarUrl: selfData?.avatarUrl,
                leagueName: selfData?.leagueName,
              }}
              size="30rem"
            />
          </motion.div>
          <Stack gap={"3rem"} alignItems={"center"}>
            {result === "LOSE" && <LoseText />}
            {result === "WIN" && <WinText />}
            {result === "DRAFT" && <DraftText />}
            <Stack direction={"row"} gap={".5rem"}>
              <Button variant={"outlined"}>SHOW RESULT</Button>
              <Button variant={"outlined"}>GO BACK</Button>
              <Button variant={"contained"}>PLAY</Button>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};
