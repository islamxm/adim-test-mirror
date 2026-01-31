import { Box, Button, Stack } from "@mui/material";

import { Description } from "../../Description/Description";
import { Icon } from "../../Icon/Icon";
import { PlanCard } from "../../PlanCard/PlanCard";
import { PlanPeriod } from "../../PlanPeriod/PlanPeriod";
import { Price } from "../../Price/Price";
import { Plan1Icon } from "./Plan1Icon";

export const Plan1 = () => {
  return (
    <PlanCard>
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "1.8rem",
          background: "linear-gradient(92deg, #22C9C9 -0.78%, #22C9C9 59.89%, #6542FF 116%)",
        }}
      />
      <Icon>
        <Plan1Icon />
      </Icon>
      <Stack gap={".4rem"}>
        <PlanPeriod value="1 месяц" />
        <Price value={240} />
      </Stack>
      <Description value="Подходит для знакомство с платформой и подробного обучения" />
      <Stack justifyContent={"flex-end"} sx={{ flexGrow: 1, width: "100%" }}>
        <Button
          variant={"contained"}
          fullWidth
          sx={{ background: "linear-gradient(90deg, #00F7FF 0%, #22C9C9 49.45%, #6542FF 118.45%)" }}
        >
          Купить
        </Button>
      </Stack>
    </PlanCard>
  );
};
