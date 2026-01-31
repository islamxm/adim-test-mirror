import { Box, Button, Stack } from "@mui/material";

import { Description } from "../../Description/Description";
import { Icon } from "../../Icon/Icon";
import { PlanCard } from "../../PlanCard/PlanCard";
import { PlanPeriod } from "../../PlanPeriod/PlanPeriod";
import { Price } from "../../Price/Price";
import { Plan3Icon } from "./Plan3Icon";

export const Plan3 = () => {
  return (
    <PlanCard>
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "1.8rem",
          background: "linear-gradient(275.15deg, #4B63C4 2.3%, #9486D4 44.55%, #C16ED5 79.95%)",
        }}
      />
      <Icon>
        <Plan3Icon />
      </Icon>
      <Stack gap={".4rem"}>
        <PlanPeriod discont={5} value="3 месяц" />
        <Price value={240} />
      </Stack>
      <Description value="Подходит для знакомство с платформой и подробного обучения" />
      <Stack justifyContent={"flex-end"} sx={{ flexGrow: 1, width: "100%" }}>
        <Button
          variant={"contained"}
          fullWidth
          sx={{
            background: "linear-gradient(275.15deg, #4B63C4 2.3%, #9486D4 44.55%, #C16ED5 79.95%)",
          }}
        >
          Купить
        </Button>
      </Stack>
    </PlanCard>
  );
};
