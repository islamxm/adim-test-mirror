import { FC } from "react";

import { Stack } from "@mui/material";

import { User } from "@/entities/user";

import { GameCountdown } from "../../GameCountdown/GameCountdown";
import { GameHeader } from "../../GameHeader/GameHeader";

type Props = {
  startCountdownSecs: number;
  opponentData: any;
  onComplete?: () => void;
  selfData?: User;
};

export const ReadyView: FC<Props> = ({
  startCountdownSecs,
  opponentData,
  onComplete,
  selfData,
}) => {
  return (
    <Stack gap={"3rem"} sx={{ height: "100%", width: "100%" }}>
      <Stack gap={"10rem"} alignItems={"center"}>
        <GameHeader selfData={selfData} opponentData={opponentData} />
        <Stack sx={{ height: "100%" }}>
          <GameCountdown duration={startCountdownSecs} onComplete={onComplete} />
        </Stack>
      </Stack>
    </Stack>
  );
};
