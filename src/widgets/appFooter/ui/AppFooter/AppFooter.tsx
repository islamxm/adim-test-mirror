"use client";
import { usePathname } from "next/navigation";

import { Box, Stack } from "@mui/material";

import { Container } from "@/shared/ui/Container";

import { Copyright } from "../Copyright/Copyright";

export const AppFooter = () => {
  const pathname = usePathname();
  if (pathname.includes("/main/")) {
    return null;
  }
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
