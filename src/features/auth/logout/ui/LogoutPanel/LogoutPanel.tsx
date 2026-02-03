import { Paper, Stack, Typography } from "@mui/material";

import { ChevronRightIcon } from "@/shared/ui/icons";

export const LogoutPanel = () => {
  return (
    <Paper
      sx={{
        width: "100%",
        borderRadius: "3.4rem",
        minHeight: "8rem",
        display: "flex",
        p: "2.4rem",
        cursor: "pointer",
      }}
    >
      <Stack
        direction={"row"}
        sx={{ flexGrow: 1 }}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Typography sx={{ fontSize: "1.8rem" }}>Выйти с аккаунта</Typography>
        <ChevronRightIcon sx={{ fontSize: "3rem" }} />
      </Stack>
    </Paper>
  );
};
