import { Button, Stack, Typography } from "@mui/material";

import { ChevronRightIcon, HeadphonesIcon } from "@/shared/ui/icons";

export const FeedbackPanel = () => {
  return (
    <Button
      sx={{
        width: "100%",
        borderRadius: "2.4rem",
        minHeight: "8rem",
        display: "flex",
        p: "2.4rem",
        cursor: "pointer",
        backgroundColor: "#fff",
        boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.15)",
        "&:hover": {
          boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.15)",
        },
      }}
    >
      <Stack
        sx={{ flexGrow: 1 }}
        direction={"row"}
        gap={"1rem"}
        justifyContent={"flex-start"}
        alignItems={"center"}
      >
        <HeadphonesIcon sx={{ fontSize: "3.2rem" }} />
        <Stack
          direction={"row"}
          sx={{ flexGrow: 1 }}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Typography sx={{ fontSize: "1.8rem" }}>Обратная связь</Typography>
          <ChevronRightIcon sx={{ fontSize: "3rem" }} />
        </Stack>
      </Stack>
    </Button>
  );
};
