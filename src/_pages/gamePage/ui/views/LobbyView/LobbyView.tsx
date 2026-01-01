import { Button, Stack } from "@mui/material";
import { motion } from "motion/react";
import { Player } from "../../Player/Player";
import { userApi } from "@/entities/user";
import { FC } from "react";

type Props = {
  selfStatus: any;
  onStartSearching?: () => void
}

export const LobbyView:FC<Props> = ({
  selfStatus,
  onStartSearching
}) => {
  const { data } = userApi.useGetUserProfileQuery(undefined);


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
              profileName: data?.profileName,
              avatarUrl: data?.avatarUrl,
              leagueName: data?.leagueName
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
