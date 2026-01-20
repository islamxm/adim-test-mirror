import { FC } from "react";

import { Box, Button, Stack } from "@mui/material";
import { motion } from "motion/react";

import { League, LeagueBadge } from "@/entities/league";
import { User } from "@/entities/user";

import { Player } from "../../Player/Player";
import { PlayerName } from "../../PlayerName/PlayerName";
import { PlayerStatus } from "../../PlayerStatus/PlayerStatus";

type Props = {
  selfStatus: any;
  onStartSearching?: () => void;
  selfData?: User;
};

export const LobbyView: FC<Props> = ({ selfStatus, onStartSearching, selfData }) => {
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
                <PlayerStatus status={selfStatus} />
              </>
            }
          />
        </motion.div>
      </Stack>
      <Stack gap={"1rem"} direction={"row"} justifyContent={"center"}>
        <Button variant={"contained"} onClick={onStartSearching} color={"primary"}>
          START SEARCHING
        </Button>
      </Stack>
    </Stack>
  );
};
