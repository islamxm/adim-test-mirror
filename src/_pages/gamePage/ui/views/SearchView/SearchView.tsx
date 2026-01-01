import { Box, Button, Stack } from "@mui/material";
import { motion } from "motion/react";
import { Player } from "../../Player/Player";
import { userApi } from "@/entities/user";
import { FC } from "react";

type Props = {
  selfStatus: any;
};

export const SearchView: FC<Props> = ({ selfStatus }) => {
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
        <motion.div layoutId="player">
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
        <Box sx={{ height: "20rem", width: "20rem", flex: "0 0 auto" }} />
        <motion.div layoutId="opponent">
          <Player
            data={{
              profileName: "",
              avatarUrl: "",
            }}
            size="22rem"
            isSearching
          />
        </motion.div>
      </Stack>
      <Stack gap={"1rem"} direction={"row"} justifyContent={"center"}>
        <Button
          variant={"contained"}
          disabled
        >
          SEARCHING...
        </Button>
      </Stack>
    </Stack>
  );
};
