import { useState } from "react";

import { Button, Paper, Stack, Typography } from "@mui/material";

import { ChevronRightIcon, ExternalLinkIcon } from "@/shared/ui/icons";

import { useLogout } from "../../lib/useLogout";
import { LogoutConfirmModal } from "../LogoutConfirmModal/LogoutConfirmModal";

export const LogoutPanel = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <LogoutConfirmModal open={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <Button
        onClick={() => setIsModalOpen(true)}
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
          <ExternalLinkIcon sx={{ fontSize: "3.2rem", color: "red" }} />
          <Stack
            direction={"row"}
            sx={{ flexGrow: 1 }}
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <Typography sx={{ fontSize: "1.8rem" }}>Выйти с аккаунта</Typography>
            <ChevronRightIcon sx={{ fontSize: "3rem" }} />
          </Stack>
        </Stack>
      </Button>
    </>
  );
};
