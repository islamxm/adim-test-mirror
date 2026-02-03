"use client";
import { PropsWithChildren } from "react";

import { Stack } from "@mui/material";

import { Container } from "@/shared/ui";

import { CategoryTabs } from "@/features/category/select-category";

import { PageEnterAnimationLayout } from "@/widgets/pageEnterAnimationLayout";
import { PromoSection } from "@/widgets/promoSection";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <PageEnterAnimationLayout>
      <Stack
        sx={(theme) => ({
          pt: "13.8rem",
          backgroundColor: theme.palette.gold.light,
          height: "100%",
        })}
      >
        <Stack gap={"4.4rem"}>
          <PromoSection bgcolor={"unset"} />
          <Container>
            <CategoryTabs />
          </Container>
        </Stack>
        {children}
      </Stack>
    </PageEnterAnimationLayout>
  );
}
