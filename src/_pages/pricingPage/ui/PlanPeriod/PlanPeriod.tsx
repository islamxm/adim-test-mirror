import { FC } from "react";

import { Chip, Typography } from "@mui/material";

import { DiscontBadge } from "../DiscontBadge/DiscontBadge";

type Props = {
  value: string;
  discont?: number;
};

export const PlanPeriod: FC<Props> = ({ value, discont }) => {
  return (
    <Typography align="center" sx={{ fontWeight: 700, fontSize: "1.8rem" }}>
      {value}
      {discont && <DiscontBadge value={discont} />}
    </Typography>
  );
};
