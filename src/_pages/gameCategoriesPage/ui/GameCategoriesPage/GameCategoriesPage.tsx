"use client";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";

import { Box, Grid, IconButton, Stack, Typography, useTheme } from "@mui/material";

import { useRouterProgress } from "@/shared/lib";
import { getGamePage } from "@/shared/model";
import { Container } from "@/shared/ui";
import { ChevronLeftIcon } from "@/shared/ui/icons";

import { competitionApi } from "@/entities/competition";

import { GameCategory } from "../GameCategory/GameCategory";
import { GameCategorySkeleton } from "../GameCategory/GameCategory.skeleton";

export const GameCategoriesPage = () => {
  const router = useRouterProgress();
  const theme = useTheme();
  const { category: categoryId } = useParams();
  const { data, isLoading } = competitionApi.useGetCompetitionCategoriesQuery(undefined);
  const t = useTranslations("pages.gameCategoriesPage.GameCategoriesPage");

  const list =
    (categoryId ? data?.find((c) => c.id === Number(categoryId))?.subCategories : data) || [];

  return (
    <Box pt={"14rem"}>
      <Container>
        <Stack gap={"4rem"}>
          <Box sx={{ position: "relative" }}>
            {categoryId && (
              <IconButton
                onClick={() => router.push(getGamePage())}
                sx={{ position: "absolute", left: 0, top: "calc(50% - (45px / 2))" }}
              >
                <ChevronLeftIcon sx={{ fontSize: "3rem", color: theme.palette.primary.main }} />
              </IconButton>
            )}
            <Typography variant="h2" align={"center"}>
              {t("title")}
            </Typography>
          </Box>
          {isLoading && (
            <Grid spacing={"2rem"} container>
              <Grid size={4}>
                <GameCategorySkeleton />
              </Grid>
              <Grid size={4}>
                <GameCategorySkeleton />
              </Grid>
              <Grid size={4}>
                <GameCategorySkeleton />
              </Grid>
            </Grid>
          )}
          {data && !isLoading && (
            <Grid spacing={"2rem"} container justifyContent={"center"}>
              {list.map((category) => (
                <Grid size={4} key={category.id}>
                  <GameCategory {...category} parentId={categoryId} />
                </Grid>
              ))}
            </Grid>
          )}
        </Stack>
      </Container>
    </Box>
  );
};
