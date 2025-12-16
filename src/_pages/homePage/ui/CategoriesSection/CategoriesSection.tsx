'use client';
import { Container } from "@/shared/ui/Container";
import { SectionHead } from "@/shared/ui/SectionHead";
import { Box, Button, Stack } from "@mui/material";
import { ArrowRightIcon } from "@/shared/ui/icons";
import { Category, CategoryCard } from "@/entities/category";
import { FC } from "react";

type Props = {
  data: Array<Category>
}

export const CategoriesSection:FC<Props> = ({data}) => {

  return (
    <Box sx={theme => ({py: "3.5rem", backgroundColor: theme.palette.background.default})}>
      <Container>
        <SectionHead
          title={"explore courses categories"}
          subtitle={
            "Lorem ipsum dolor sit amet consectetur. Facilisi sollicitudin tempus sit ac. Tellus ac cras in metus curabitur aliquet. "
          }
          action={
            <Button variant={"contained"} endIcon={<ArrowRightIcon/>}>See all</Button>
          }
        />
        <Stack direction={"row"} gap={"2rem"}>
          {
            data.map(category => (
              <CategoryCard key={category.id} {...category}/>
            ))
          }
        </Stack>
      </Container>
    </Box>
  );
};
