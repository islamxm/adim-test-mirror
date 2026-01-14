"use client";
import { FC } from "react";

import { useTranslations } from "next-intl";

import { Box, Button, Grid } from "@mui/material";

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
        <Grid spacing={"2rem"} container>
          {data.map((category) => (
            <Grid size={4} key={category.id}>
              <CategoryCard {...category} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};
