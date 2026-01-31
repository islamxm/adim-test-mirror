import { FC } from "react";

import { Typography } from "@mui/material";

export const Description: FC<{ value?: string }> = ({ value }) => {
  return (
    <Typography align="center" sx={{ fontSize: "1.2rem" }}>
      {value}
    </Typography>
  );
};
