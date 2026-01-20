import { FC } from "react";

import { Box, Stack } from "@mui/material";
import { motion } from "motion/react";

import { CnServerEventsMap } from "@/entities/competition";
import { League, LeagueBadge } from "@/entities/league";
import { User } from "@/entities/user";

import { PlayerStatus as PlayerStatusType } from "../../model";
import { Player } from "../Player/Player";
import { PlayerName } from "../PlayerName/PlayerName";
import { PlayerStatus } from "../PlayerStatus/PlayerStatus";
import { QuestionCountdown } from "../QuestionCountdown/QuestionCountdown";

type Props = {
  opponentData: CnServerEventsMap["OPPONENT_FOUND"] | undefined;
  question?: CnServerEventsMap["NEXT_QUESTION"];
  onComplete?: (ms: number) => void;
  selfData?: User;
  opponentStatus?: PlayerStatusType;
  selfStatus?: PlayerStatusType;
};

export const GameHeader: FC<Props> = ({
  opponentData,
  onComplete,
  question,
  selfData,
  opponentStatus,
  selfStatus,
}) => {
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
            avatarUrl: selfData?.avatarUrl,
          }}
          size="12.4rem"
          direction={"row"}
          extraContentAlignItems={"center"}
          extraContent={
            <Stack gap={".8rem"} sx={{ p: "1rem 1rem 1rem 0" }}>
              <PlayerName profileName={selfData?.profileName} />
              <Stack direction={"row"} gap={"1.2rem"}>
                {selfData?.leagueName && (
                  <LeagueBadge leagueName={selfData?.leagueName as League} />
                )}
                <PlayerStatus status={selfStatus} />
              </Stack>
            </Stack>
          }
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
            avatarUrl: opponentData?.opponentId?.avatarUrl,
          }}
          size="12.4rem"
          direction={"row-reverse"}
          extraContentAlignItems={"flex-end"}
          extraContent={
            <Stack sx={{ p: "1rem 0 1rem 1rem" }} gap={".8rem"} justifyContent={"flex-end"}>
              <PlayerName profileName={opponentData?.opponentId?.profileName} textAlign={"right"} />
              <Stack direction={"row"} gap={"1.2rem"} justifyContent={"flex-end"}>
                <PlayerStatus status={opponentStatus} />
                {opponentData?.opponentId.leagueName && (
                  <LeagueBadge leagueName={opponentData?.opponentId.leagueName as League} />
                )}
              </Stack>
            </Stack>
          }
        />
      </Box>
    </Stack>
  );
};
