import { FC } from "react";

import { Box, Stack } from "@mui/material";
import { motion } from "motion/react";

import { CnServerEventsMap } from "@/entities/competition";
import { League, LeagueBadge } from "@/entities/league";
import { User } from "@/entities/user";

import { Player } from "../../Player/Player";
import { SearchDots } from "../../Player/SearchDots";
import { PlayerName } from "../../PlayerName/PlayerName";
import { PlayerStatus } from "../../PlayerStatus/PlayerStatus";

type Props = {
  opponentData: any;
  result?: {
    winner?: number | null;
    selfResult: CnServerEventsMap["RESULT"]["answers"];
    opponentResult?: CnServerEventsMap["RESULT"]["opponentAnswers"];
  };
  selfData?: User;
};

export const WaitResultView: FC<Props> = ({ opponentData, selfData }) => {
  return (
    <Stack gap={"3rem"} justifyContent={"center"} sx={{ height: "100%" }}>
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
                <PlayerStatus status={"READY"} />
              </>
            }
          />
        </motion.div>
        <Stack
          justifyContent={"center"}
          alignItems={"center"}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          component={motion.div}
          sx={{ height: "20rem", width: "20rem", flex: "0 0 auto" }}
        >
          <SearchDots />
        </Stack>
        <motion.div layoutId="opponent">
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
                <PlayerStatus status={"WAIT"} />
              </>
            }
          />
        </motion.div>
      </Stack>
    </Stack>
  );
};
