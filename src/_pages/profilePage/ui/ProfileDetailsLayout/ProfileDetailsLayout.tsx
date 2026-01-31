import { FC, ReactNode } from "react";

import { Box, Paper } from "@mui/material";

type Props = {
  leftTop?: ReactNode;
  leftBottom?: ReactNode;
  right?: ReactNode;
};

export const ProfileDetailsLayout: FC<Props> = ({ leftTop, leftBottom, right }) => {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateAreas: '"left-top right" "left-bottom right"',
        gap: "1.8rem",
        gridTemplateColumns: "1fr 41.6rem",
      }}
    >
      <Paper
        sx={{ gridArea: "left-top", width: "100%", borderRadius: "3.4rem", minHeight: "13.4rem" }}
      >
        {leftTop}
      </Paper>
      <Paper
        sx={{
          gridArea: "left-bottom",
          width: "100%",
          borderRadius: "3.4rem",
          minHeight: "13.4rem",
        }}
      >
        {leftBottom}
      </Paper>
      <Paper
        sx={{ gridArea: "right", width: "100%", borderRadius: "3.4rem", minHeight: "28.6rem" }}
      >
        {right}
      </Paper>
    </Box>
  );
};
