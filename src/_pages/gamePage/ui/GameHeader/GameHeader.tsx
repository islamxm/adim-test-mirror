import { Box, Stack } from "@mui/material";
import { Player } from "../Player/Player";
import { userApi } from "@/entities/user";
import { motion } from "motion/react";
import { QuestionCountdown } from "../QuestionCountdown/QuestionCountdown";
import { FC } from "react";
import { CnServerEventsMap } from "@/entities/competition";

type Props = {
  opponentData: any;
  question?: CnServerEventsMap["NEXT_QUESTION"];
  onComplete?: (ms: number) => void;
};

export const GameHeader: FC<Props> = ({
  opponentData,
  onComplete,
  question,
}) => {
  const { data } = userApi.useGetUserProfileQuery(undefined);

  if (!data) {
    return null;
  }

  return (
    <Stack
      gap={"2rem"}
      direction={"row"}
      justifyContent={"space-between"}
      alignItems={"center"}
      sx={{ width: "100%" }}
    >
      <Box component={motion.div} layoutId="player" sx={{ flex: 1 }}>
        <Player
          data={{
            profileName: data.profileName,
            avatarUrl: data.avatarUrl,
            leagueName: data.leagueName,
          }}
          size="12.4rem"
          direction={"row"}
          extraContentAlignItems={"flex-start"}
        />
      </Box>
      <Box sx={{ width: "10rem", height: "10rem", flex: "0 0 auto" }}>
        {question && (
          <QuestionCountdown
            id={question.question.id}
            duration={question.question.deadlineSec}
            onComplete={onComplete}
          />
        )}
      </Box>
      <Box component={motion.div} layoutId="opponent" sx={{ flex: 1 }}>
        <Player
          data={{
            profileName: opponentData?.opponentId?.profileName,
            avatarUrl: opponentData?.opponentId?.avatarUrl,
            leagueName: opponentData?.opponentId?.leagueName,
          }}
          size="12.4rem"
          direction={"row-reverse"}
          extraContentAlignItems={"flex-end"}
        />
      </Box>
    </Stack>
  );
};
