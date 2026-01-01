"use client";
import { competitionApi } from "@/entities/competition";
import { Container } from "@/shared/ui";
import { Box, Grid, Stack, Typography } from "@mui/material";
import { GameCategory } from "../GameCategory/GameCategory";
import { useParams } from "next/navigation";

export const GameCategoriesPage = () => {
  const {category: categoryId} = useParams()
  const { data } = competitionApi.useGetCompetitionCategoriesQuery(undefined);

  if (!data) {
    return null;
  }


  const list = (categoryId ? data.find(c => c.id === Number(categoryId))?.subCategories : data) || []

  return (
    <Box pt={"14rem"}>
      <Container>
        <Stack gap={"4rem"}>
          <Typography variant="h2">Select a competition category</Typography>
          <Grid gap={"1rem"} container>
            {list.map((category) => (
              <Grid size={3} key={category.id}>
                <GameCategory
                  {...category}
                  parentId={categoryId}
                  />
              </Grid>
            ))}
          </Grid>
        </Stack>
      </Container>
    </Box>
  );
};
