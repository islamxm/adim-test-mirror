import { FC } from "react";

import { Box, Button, Stack } from "@mui/material";
import { motion } from "motion/react";

import { YellowButton } from "@/shared/ui";

import { Player, PlayerName, PlayerStatus } from "@/entities/competition";
import { League, LeagueBadge } from "@/entities/league";
import { User } from "@/entities/user";

import { PlayerAnimatedWrapper } from "../../PlayerAnimatedWrapper/PlayerAnimatedWrapper";
import { PlayerBadge } from "../../PlayerBadge/PlayerBadge";

type Props = {
  selfStatus: any;
  selfData?: User;
};

export const SearchView: FC<Props> = ({ selfStatus, selfData }) => {
  return (
    <Stack gap={"20rem"} justifyContent={"center"} sx={{ height: "100%" }}>
      <Stack
        alignItems={"flex-start"}
        direction={"row"}
        gap={"11rem"}
        justifyContent={"center"}
        component={motion.div}
      >
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
        <Box component={motion.div} sx={{ height: "20rem", width: "20rem", flex: "0 0 auto" }} />
        <PlayerAnimatedWrapper layoutId="opponent">
          <Player
            avatarProps={{
              size: "22rem",
            }}
            isSearching
          />
        </PlayerAnimatedWrapper>
      </Stack>
      <Stack gap={"1rem"} direction={"row"} justifyContent={"center"}>
        <YellowButton disabled>Searching...</YellowButton>
        {/* <Button variant={"contained"} disabled>
          Searching...
        </Button> */}
      </Stack>
    </Stack>
  );
};
