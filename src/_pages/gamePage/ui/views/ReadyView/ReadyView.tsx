import { Stack } from "@mui/material";
import { motion } from "motion/react";
import { FC } from "react";
import { GameHeader } from "../../GameHeader/GameHeader";
import { GameCountdown } from "../../GameCountdown/GameCountdown";
import { User } from "@/entities/user";

type Props = {
  startCountdownSecs: number;
  opponentData: any;
  onComplete?: () => void;
  selfData?: User
};

export const ReadyView: FC<Props> = ({
  startCountdownSecs,
  opponentData,
  onComplete,
  selfData
}) => {

  return (
    <Stack gap={"3rem"} sx={{ height: "100%" }}>
      <Stack gap={"10rem"} alignItems={"center"} component={motion.div}>
        <GameHeader selfData={selfData} opponentData={opponentData} />
        <Stack sx={{ height: "100%" }}>
          <GameCountdown
            duration={startCountdownSecs}
            onComplete={onComplete}
          />
        </Stack>
      </Stack>
    </Stack>
  );
};
