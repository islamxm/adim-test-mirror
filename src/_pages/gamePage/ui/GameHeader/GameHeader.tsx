import { FC } from "react";

import { Box, Stack } from "@mui/material";
import { motion } from "motion/react";

import { CnServerEventsMap, PlayerStatusType } from "@/entities/competition";
import { Player, PlayerName, PlayerStatus } from "@/entities/competition";
import { League, LeagueBadge } from "@/entities/league";
import { Avatar, User } from "@/entities/user";

import { PlayerAnimatedWrapper } from "../PlayerAnimatedWrapper/PlayerAnimatedWrapper";
import { PlayerBadge } from "../PlayerBadge/PlayerBadge";
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
      <PlayerAnimatedWrapper layoutId="self">
        <Player
          avatarProps={{
            size: "12.4rem",
            avatarUrl: selfData?.avatarUrl,
          }}
          extraContent={
            <PlayerBadge direction="row" side="left">
              <Stack gap={".8rem"} sx={{ p: "1rem 1rem 1rem 0" }}>
                <PlayerName profileName={selfData?.profileName} />
                <Stack direction={"row"} gap={"1.2rem"}>
                  {selfData?.leagueName && (
                    <LeagueBadge leagueName={selfData?.leagueName as League} />
                  )}
                  <PlayerStatus status={selfStatus} />
                </Stack>
              </Stack>
            </PlayerBadge>
          }
        />
      </PlayerAnimatedWrapper>
      <Box
        sx={{
          width: "10rem",
          height: "10rem",
          flex: "0 0 auto",
          position: "absolute",
          top: `calc(50% - (10rem / 2))`,
          left: `calc(50% - (10rem / 2))`,
        }}
      >
        {question && (
          <QuestionCountdown
            id={question.question.id}
            duration={question.question.deadlineSec}
            onComplete={onComplete}
          />
        )}
      </Box>
      <PlayerAnimatedWrapper layoutId="opponent">
        <Player
          avatarProps={{
            size: "12.4rem",
            avatarUrl: opponentData?.opponentId?.avatarUrl,
          }}
          extraContent={
            <PlayerBadge side="right" direction="row">
              <Stack sx={{ p: "1rem 0 1rem 1rem" }} gap={".8rem"} justifyContent={"flex-end"}>
                <PlayerName
                  profileName={opponentData?.opponentId?.profileName}
                  textAlign={"right"}
                />
                <Stack direction={"row"} gap={"1.2rem"} justifyContent={"flex-end"}>
                  <PlayerStatus status={opponentStatus} />
                  {opponentData?.opponentId.leagueName && (
                    <LeagueBadge leagueName={opponentData?.opponentId.leagueName as League} />
                  )}
                </Stack>
              </Stack>
            </PlayerBadge>
          }
        />
      </PlayerAnimatedWrapper>
    </Stack>
  );
};
