"use client";
import classes from "./classes.module.scss";
import { CompetitionRules, CompetitionWS } from "@/entities/competition";
import { Container } from "@/shared/ui";
import { Box, Button, Stack } from "@mui/material";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

export const PointsPage = () => {
  const { data, status } = useSession();

  // TEST WEBSOCKET
  // useEffect(() => {
  //   console.log(data);
  //   if (data?.accessToken && status === "authenticated") {
  //     const ws = new CompetitionWS(
  //       process.env.NEXT_PUBLIC_WS_URL || "",
  //       data.accessToken
  //     );
  //     ws.connect();
  //   }
  // }, [data, status]);

  return (
    <Stack
      sx={(theme) => ({
        pt: "13.8rem",
        pb: "5rem",
        backgroundColor: theme.palette.common.white,
        height: "100%",
      })}
    >
      <Container sx={{ height: "100%" }}>
        <Box className={classes.game}>
          <Box className={classes.main}>
            <CompetitionRules />
          </Box>
          <Box className={classes.players}>
            <Stack></Stack>
            <Button variant={"contained"}>Test</Button>
          </Box>
        </Box>
      </Container>
    </Stack>
  );
};
