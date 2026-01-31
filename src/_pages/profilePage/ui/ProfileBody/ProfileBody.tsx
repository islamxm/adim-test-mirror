import { FC, PropsWithChildren } from "react";

import { Box, Stack } from "@mui/material";

import { Container } from "@/shared/ui";

export const ProfileBody: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Box sx={{ backgroundColor: "#fff", py: "3.4rem", flexGrow: 1 }}>
      <Container sx={{ maxWidth: "82rem", px: "1rem", width: "100%", margin: "0 auto" }}>
        <Stack gap={"3.4rem"}>{children}</Stack>
      </Container>
    </Box>
  );
};
