import { FC } from "react";

import { Box, Button, Stack } from "@mui/material";
import { AnimatePresence, motion } from "motion/react";

import { YellowButton } from "@/shared/ui";
import { ChevronRightDuo } from "@/shared/ui/icons";

import {
  CnServerEventsMap,
  Player,
  PlayerName,
  PlayerStatus,
  PlayerStatusType,
  Versus,
} from "@/entities/competition";
import { League, LeagueBadge } from "@/entities/league";
import { User } from "@/entities/user";

import { PlayerAnimatedWrapper } from "../../PlayerAnimatedWrapper/PlayerAnimatedWrapper";
import { PlayerBadge } from "../../PlayerBadge/PlayerBadge";

type Props = {
  selfStatus?: PlayerStatusType;
  opponentStatus?: PlayerStatusType;
  opponentData?: CnServerEventsMap["OPPONENT_FOUND"];
  onReady?: () => void;
  onSkipPlayer?: () => void;
  selfData?: User;
  isConnected?: boolean;
};

export const WaitView: FC<Props> = ({
  selfStatus,
  opponentStatus,
  opponentData,
  onReady,
  onSkipPlayer,
  selfData,
  isConnected,
}) => {
  return (
    <Stack
      gap={"20rem"}
      justifyContent={"center"}
      sx={{ height: "100%", width: "100%", position: "relative" }}
    >
      <Stack alignItems={"flex-start"} justifyContent={"center"} direction={"row"} gap={"11rem"}>
        <PlayerAnimatedWrapper layoutId="self">
          <Player
            avatarProps={{
              size: "22rem",
              avatarUrl: selfData?.avatarUrl,
            }}
            extraContent={
              <PlayerBadge side="left">
                <PlayerName profileName={selfData?.profileName} />
                <Box sx={{ position: "relative", zIndex: 1, height: "4.2rem" }}>
                  <LeagueBadge leagueName={selfData?.leagueName as League} />
                </Box>
                <PlayerStatus status={selfStatus} />
              </PlayerBadge>
            }
          />
        </PlayerAnimatedWrapper>
        <Box sx={{ height: "20rem", width: "20rem", flex: "0 0 auto" }}>
          <AnimatePresence>
            <Box
              pt={"2.1rem"}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              component={motion.div}
              exit={{ opacity: 0 }}
            >
              <Versus />
            </Box>
          </AnimatePresence>
        </Box>
        <PlayerAnimatedWrapper layoutId="opponent">
          <Player
            avatarProps={{
              size: "22rem",
              avatarUrl: opponentData?.opponentId?.avatarUrl,
            }}
            extraContent={
              <PlayerBadge side="right">
                <PlayerName profileName={opponentData?.opponentId?.profileName} />
                <Box sx={{ position: "relative", zIndex: 1, height: "4.2rem" }}>
                  <LeagueBadge leagueName={opponentData?.opponentId.leagueName as League} />
                </Box>
                <PlayerStatus status={opponentStatus} />
              </PlayerBadge>
            }
          />
          <Button
            sx={{
              position: "absolute",
              top: "8rem",
              right: 0,
              transform: "translateX(calc(100% + 10px))",
              height: "6rem",
            }}
            endIcon={<ChevronRightDuo />}
            onClick={onSkipPlayer}
            disabled={!isConnected}
          >
            Skip player
          </Button>
        </PlayerAnimatedWrapper>
      </Stack>
      <Stack gap={"1rem"} direction={"row"} justifyContent={"center"}>
        <YellowButton onClick={onReady}>Ready</YellowButton>
        {/* <Button variant={"contained"} onClick={onReady} color={"primary"}>
          Ready
        </Button> */}
      </Stack>
    </Stack>
  );
};
