"use client";
import { Box, Stack } from "@mui/material";

import { Container } from "@/shared/ui/Container";

import { Copyright } from "../Copyright/Copyright";

export const AppFooter = () => {
  return (
    <Box sx={(theme) => ({ backgroundColor: theme.palette.gold.light })}>
      <Container>
        <Stack py={"3rem"} direction={"row"} justifyContent={"center"}>
          <Copyright />
        </Stack>
      </Container>
    </Box>
  );
};
