import { Stack } from "@mui/material";
import { motion } from "motion/react";
import { FC } from "react";
import { CnServerEventsMap } from "@/entities/competition";
import { Player } from "../../Player/Player";
import { userApi } from "@/entities/user";
import { SearchDots } from "../../Player/SearchDots";

type Props = {
  opponentData: any;
  result?: {
    winner?: number | null;
    selfResult: CnServerEventsMap["RESULT"]["answers"];
    opponentResult?: CnServerEventsMap["RESULT"]["opponentAnswers"];
  };
};

export const WaitResultView: FC<Props> = ({ opponentData, result }) => {
  const { data } = userApi.useGetUserProfileQuery({});

  if (!result) {
    return null;
  }

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
              leagueName: data?.leagueName,
            }}
            status={"READY"}
            size="22rem"
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
              profileName: opponentData?.opponentId.profileName,
              avatarUrl: opponentData?.opponentId.avatarUrl,
              leagueName: opponentData?.opponentId?.leagueName,
            }}
            status={"WAIT"}
            size="22rem"
          />
        </motion.div>
      </Stack>
    </Stack>
  );
};
