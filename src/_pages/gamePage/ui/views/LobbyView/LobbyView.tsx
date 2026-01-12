import { FC } from "react";

import { Button, Stack } from "@mui/material";
import { motion } from "motion/react";

import { User } from "@/entities/user";

import { Player } from "../../Player/Player";

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
              profileName: selfData?.profileName,
              avatarUrl: selfData?.avatarUrl,
              leagueName: selfData?.leagueName,
            }}
            status={selfStatus}
            size="22rem"
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
