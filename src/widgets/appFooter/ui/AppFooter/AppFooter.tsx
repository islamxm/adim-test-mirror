"use client";
import { Stack } from "@mui/material";
import { Copyright } from "../Copyright/Copyright";
import { Container } from "@/shared/ui/Container";

export const AppFooter = () => {
  return (
    <Container>
      <Stack py={"3rem"} direction={"row"} justifyContent={"center"}>
        <Copyright/>
      </Stack>
    </Container>
  );
};
