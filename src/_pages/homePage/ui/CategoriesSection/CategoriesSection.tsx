"use client";
import { FC } from "react";

import { useTranslations } from "next-intl";

import { Box, Button, Stack } from "@mui/material";

import { Container } from "@/shared/ui/Container";
import { SectionHead } from "@/shared/ui/SectionHead";
import { ArrowRightIcon } from "@/shared/ui/icons";

import { Category, CategoryCard } from "@/entities/category";

type Props = {
  data: Array<Category>;
};

export const CategoriesSection: FC<Props> = ({ data }) => {
  const t = useTranslations("pages.homePage.CategoriesSection");

  return (
    <Box
      sx={(theme) => ({
        py: "3.5rem",
        backgroundColor: theme.palette.background.default,
      })}
    >
      <Container>
        <SectionHead
          title={t("title")}
          subtitle={t("subtitle")}
          action={
            <Button variant={"contained"} endIcon={<ArrowRightIcon />}>
              {t("more_button")}
            </Button>
          }
        />
        <Stack direction={"row"} gap={"2rem"}>
          {data.map((category) => (
            <CategoryCard key={category.id} {...category} />
          ))}
        </Stack>
      </Container>
    </Box>
  );
};
