import { Paper, Typography } from "@mui/material";
import { BronzeIcon } from "../../icons";

export const LeagueBadge = () => {
  return (
    <Paper
      sx={(theme) => ({
        height: "4.2rem",
        borderRadius: "2.1rem",
        display: "flex",
        gap: "0.4rem",
        alignItems: "center",
        px: "1.4rem",
      })}
    >
      <Typography fontSize={"1.8rem"}>Bronze</Typography>
      <BronzeIcon sx={{ fontSize: "2.4rem" }} />
    </Paper>
  );
};
