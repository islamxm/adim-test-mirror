import { FC } from "react";

import { Box } from "@mui/material";

export const DiscontBadge: FC<{ value?: number }> = ({ value }) => {
  if (!value) return null;
  return (
    <Box
      component={"span"}
      sx={{
        fontSize: "1.2rem",
        fontWeight: 400,
        color: "#fff",
        minWidth: "4.1rem",
        backgroundColor: "#000",
        textAlign: "center",
        borderRadius: "1.2rem",
        display: "inline-block",
        p: ".4rem 1.2rem",
        minHeight: "1.6rem",
        ml: ".4rem",
      }}
    >
      {value}%
    </Box>
  );
};
