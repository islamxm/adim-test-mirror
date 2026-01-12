import { FC } from "react";

import { Box, Stack } from "@mui/material";
import { motion } from "motion/react";

import { CnServerEventsMap } from "@/entities/competition";
import { User } from "@/entities/user";

import { Player } from "../Player/Player";
import { QuestionCountdown } from "../QuestionCountdown/QuestionCountdown";

type Props = {
  opponentData: any;
  question?: CnServerEventsMap["NEXT_QUESTION"];
  onComplete?: (ms: number) => void;
  selfData?: User;
};

export const GameHeader: FC<Props> = ({ opponentData, onComplete, question, selfData }) => {
  return (
    <Stack
      gap={"2rem"}
      direction={"row"}
      justifyContent={"space-between"}
      alignItems={"center"}
      sx={{ width: "100%" }}
    >
      <Box component={motion.div} layoutId="player" sx={{ flex: 1 }}>
        <Player
          data={{
            profileName: selfData?.profileName,
            avatarUrl: selfData?.avatarUrl,
            leagueName: selfData?.leagueName,
          }}
          size="12.4rem"
          direction={"row"}
          extraContentAlignItems={"flex-start"}
        />
      </Box>
      <Box sx={{ width: "10rem", height: "10rem", flex: "0 0 auto" }}>
        {question && (
          <QuestionCountdown
            id={question.question.id}
            duration={question.question.deadlineSec}
            onComplete={onComplete}
          />
        )}
      </Box>
      <Box component={motion.div} layoutId="opponent" sx={{ flex: 1 }}>
        <Player
          data={{
            profileName: opponentData?.opponentId?.profileName,
            avatarUrl: opponentData?.opponentId?.avatarUrl,
            leagueName: opponentData?.opponentId?.leagueName,
          }}
          size="12.4rem"
          direction={"row-reverse"}
          extraContentAlignItems={"flex-end"}
        />
      </Box>
    </Stack>
  );
};
