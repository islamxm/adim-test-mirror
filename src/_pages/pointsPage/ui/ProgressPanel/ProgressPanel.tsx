import { FC } from "react";

import { Paper, Stack, Typography } from "@mui/material";

import { ProgressCircle } from "../ProgressCircle/ProgressCircle";

type Props = {
  title: string;
  value: number;
  percent: number;
};

export const ProgressPanel: FC<Props> = ({ title, value, percent }) => {
  return (
    <Paper sx={{ p: "2rem" }}>
      <Stack gap={"3.4rem"} direction={"row"} justifyContent={"center"}>
        <Stack gap={"1rem"} justifyContent={"space-between"}>
          <Typography variant="h4">{title}</Typography>
          <Typography variant="h3">{value}</Typography>
        </Stack>
        <ProgressCircle percent={percent} />
      </Stack>
    </Paper>
  );
};
