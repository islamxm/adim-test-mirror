import { FC } from "react";

import { Box, Button, Stack } from "@mui/material";
import { AnimatePresence, motion } from "motion/react";

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

type Props = {
  selfStatus?: PlayerStatusType;
  opponentStatus?: PlayerStatusType;
  opponentData?: CnServerEventsMap["OPPONENT_FOUND"];
  onReady?: () => void;
  onSkipPlayer?: () => void;
  selfData?: User;
};

export const WaitView: FC<Props> = ({
  selfStatus,
  opponentStatus,
  opponentData,
  onReady,
  onSkipPlayer,
  selfData,
}) => {
  return (
    <Stack gap={"3rem"} justifyContent={"center"} sx={{ height: "100%", position: "relative" }}>
      <Stack
        alignItems={"flex-start"}
        direction={"row"}
        gap={"11rem"}
        justifyContent={"center"}
        component={motion.div}
      >
        <motion.div layoutId="player" layout="preserve-aspect">
          <Player
            data={{
              avatarUrl: selfData?.avatarUrl,
            }}
            size="22rem"
            extraContent={
              <>
                <PlayerName profileName={selfData?.profileName} />
                <Box sx={{ position: "relative", zIndex: 1, height: "4.2rem" }}>
                  {selfData?.leagueName && (
                    <LeagueBadge leagueName={selfData.leagueName as League} />
                  )}
                </Box>
                <PlayerStatus status={selfStatus} />
              </>
            }
          />
        </motion.div>
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
        <motion.div style={{ position: "relative" }} layoutId="opponent">
          <Player
            data={{
              avatarUrl: opponentData?.opponentId.avatarUrl,
            }}
            size="22rem"
            extraContent={
              <>
                <PlayerName profileName={opponentData?.opponentId?.profileName} />
                <Box sx={{ position: "relative", zIndex: 1, height: "4.2rem" }}>
                  {opponentData?.opponentId?.leagueName && (
                    <LeagueBadge leagueName={opponentData?.opponentId.leagueName as League} />
                  )}
                </Box>
                <PlayerStatus status={opponentStatus} />
              </>
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
          >
            Skip player
          </Button>
        </motion.div>
      </Stack>
      <Stack gap={"1rem"} direction={"row"} justifyContent={"center"}>
        <Button variant={"contained"} onClick={onReady} color={"primary"}>
          READY
        </Button>
      </Stack>
    </Stack>
  );
};
