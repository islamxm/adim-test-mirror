import { Box, Button, Stack } from "@mui/material";

import { Description } from "../../Description/Description";
import { Icon } from "../../Icon/Icon";
import { PlanCard } from "../../PlanCard/PlanCard";
import { PlanPeriod } from "../../PlanPeriod/PlanPeriod";
import { Price } from "../../Price/Price";
import { Plan2Icon } from "./Plan2Icon";

export const Plan2 = () => {
  return (
    <PlanCard>
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "1.8rem",
          background: "linear-gradient(92deg, #52C727 -0.78%, #7FE327 61.95%, #CCD221 107.06%)",
        }}
      />
      <Icon>
        <Plan2Icon />
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
          sx={{ background: "linear-gradient(90deg, #52C727 0%, #7FE327 49.45%, #CCD221 118.45%)" }}
        >
          Купить
        </Button>
      </Stack>
    </PlanCard>
  );
};
