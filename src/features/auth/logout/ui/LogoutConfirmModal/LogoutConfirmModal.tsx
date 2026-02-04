import { FC } from "react";

import { Button, Grid, Stack, Typography } from "@mui/material";

import { ModalProps } from "@/shared/types";
import { Modal } from "@/shared/ui";

import { useLogout } from "../../lib/useLogout";

export const LogoutConfirmModal: FC<ModalProps> = ({ onClose, ...props }) => {
  const { logout, isLoading } = useLogout();

  const handleLogout = async () => {
    await logout();
    onClose?.();
  };

  return (
    <Modal
      {...props}
      onClose={onClose}
      title="Выход"
      wrapperStyle={{ maxWidth: "45rem" }}
      contentStyle={{
        position: "relative",
      }}
    >
      <Stack gap={"3rem"}>
        <Typography sx={{ fontSize: "1.8rem" }}>
          Вы действительно хотите выйти с аккаунта?
        </Typography>
        <Grid container spacing={"1rem"}>
          <Grid size={6}>
            <Button fullWidth variant={"outlined"} onClick={() => onClose?.()}>
              Отмена
            </Button>
          </Grid>
          <Grid size={6}>
            <Button
              fullWidth
              variant={"contained"}
              color="error"
              onClick={handleLogout}
              loading={isLoading}
            >
              Выйти
            </Button>
          </Grid>
        </Grid>
      </Stack>
    </Modal>
  );
};
