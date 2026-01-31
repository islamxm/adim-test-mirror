"use client";
import { Stack, Typography } from "@mui/material";

import { PageEnterAnimationLayout } from "@/widgets/pageEnterAnimationLayout";

import { Plan1 } from "../plans/Plan1/Plan1";
import { Plan2 } from "../plans/Plan2/Plan2";
import { Plan3 } from "../plans/Plan3/Plan3";

export const PricingPage = () => {
  return (
    <PageEnterAnimationLayout>
      <Stack gap={"6.4rem"} sx={{ height: "100%", pt: "15rem" }}>
        <Stack gap={"1rem"}>
          <Typography align="center" variant="h2">
            Выберите свой тариф
          </Typography>
          <Typography align="center" sx={{ fontSize: "1.8rem", fontWeight: 600 }}>
            Приобретите подписку и получите доступ ко всему в нашей платфоме
          </Typography>
        </Stack>
        <Stack sx={{ margin: "0 auto" }} direction={"row"} gap={"4rem"} alignItems={"flex-start"}>
          <Plan1 />
          <Plan2 />
          <Plan3 />
        </Stack>
      </Stack>
    </PageEnterAnimationLayout>
  );
};
