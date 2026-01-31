import { FC } from "react";

import { Box, Typography } from "@mui/material";

export const Price: FC<{ value?: number }> = ({ value }) => {
  return (
    <Typography align="center" sx={{ fontSize: "3.4rem", fontWeight: 700 }}>
      {value}
      <Box
        sx={{ color: "#616161", fontSize: "1.8rem", fontWeight: 400, ml: ".4rem" }}
        component={"span"}
      >
        TMT
      </Box>
    </Typography>
  );
};
