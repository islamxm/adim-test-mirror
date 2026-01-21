import { Paper, Stack, Typography } from "@mui/material";
import { motion } from "motion/react";

import { YellowSpinner } from "@/shared/ui";

export const ResultListLoading = () => {
  return (
    <Paper
      sx={{
        p: "1.6rem 2rem",
        height: "calc(100vh - 460px)",
        overflowY: "auto",
        borderRadius: "3.4rem",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      elevation={0}
      component={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Stack gap={"2.4rem"} alignItems={"center"}>
        <YellowSpinner />
        <Typography sx={{ fontSize: "1.6rem", fontWeight: 600, textAlign: "center" }}>
          Ожидание соперника
        </Typography>
      </Stack>
    </Paper>
  );
};
