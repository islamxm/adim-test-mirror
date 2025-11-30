import { Paper, Typography } from "@mui/material";
import { StreakIcon } from "@/shared/ui/icons";

export const StreakBadge = () => {
  return (
    <Paper
      sx={theme => ({
        height: "4.2rem",
        borderRadius: "2.1rem",
        display: "flex",
        gap: "0.4rem",
        alignItems: "center",
        px: "1.4rem"
      })}
      >
      <StreakIcon
        sx={{
          fontSize: "2.4rem"
        }}
        />
      <Typography fontSize={"1.8rem"}>
        0 days sequence
      </Typography>
    </Paper>
  )
}