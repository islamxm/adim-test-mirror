import { FC } from "react";

import { Box, Button, Stack } from "@mui/material";
import { motion } from "motion/react";

import { Player, PlayerName, PlayerStatus } from "@/entities/competition";
import { League, LeagueBadge } from "@/entities/league";
import { User } from "@/entities/user";

type Props = {
  selfStatus: any;
  selfData?: User;
};

export const SearchView: FC<Props> = ({ selfStatus, selfData }) => {
  return (
    <Stack gap={"3rem"} justifyContent={"center"} sx={{ height: "100%" }}>
      <Stack
        alignItems={"flex-start"}
        direction={"row"}
        gap={"11rem"}
        justifyContent={"center"}
        component={motion.div}
      >
        <motion.div layoutId="player">
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
        <Box sx={{ height: "20rem", width: "20rem", flex: "0 0 auto" }} />
        <motion.div layoutId="opponent">
          <Player
            data={{
              avatarUrl: "",
            }}
            size="22rem"
            isSearching
          />
        </motion.div>
      </Stack>
      <Stack gap={"1rem"} direction={"row"} justifyContent={"center"}>
        <Button variant={"contained"} disabled>
          SEARCHING...
        </Button>
      </Stack>
    </Stack>
  );
};
