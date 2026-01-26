import { FC } from "react";

import { Stack, Typography } from "@mui/material";

import { StreakIcon } from "@/shared/ui/icons";

import { UserStreak } from "../../model";
import { StreakDays } from "../StreakDays/StreakDays";

type Props = {
  data: UserStreak;
};

export const StreakDetailsPanel: FC<Props> = ({ data }) => {
  return (
    <Stack gap={"1.6rem"} sx={{ p: "2.4rem", width: "41.4rem" }}>
      <Stack direction={"row"} gap={"1rem"} alignItems={"center"}>
        <StreakIcon sx={{ fontSize: "3.8rem" }} />
        <Stack gap={".4rem"}>
          <Typography sx={{ fontSize: "1.8rem", fontWeight: 600 }}>
            {data.currentStreak} {data.currentStreak > 1 ? "days" : "day"} sequence
          </Typography>
          {/* <Typography color={"textDisabled"}>
            Lorem ipsum quisque mollis vel ultricies faucibus.
          </Typography> */}
        </Stack>
      </Stack>
      <StreakDays streak={data} />
    </Stack>
  );
};
