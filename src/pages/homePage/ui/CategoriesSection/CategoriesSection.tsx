'use client';
import { Container } from "@/shared/ui/Container";
import { SectionHead } from "@/shared/ui/SectionHead";
import { Box, Button, Stack } from "@mui/material";
import { ArrowRightIcon } from "@/shared/ui/icons";
import { CategoryCard } from "@/entities/category";

export const CategoriesSection = () => {
  return (
    <Box py={"3.5rem"} sx={theme => ({backgroundColor: theme.palette.common.white})}>
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
          <CategoryCard/>
          <CategoryCard/>
          <CategoryCard/>
        </Stack>
      </Container>
    </Box>
  );
};
