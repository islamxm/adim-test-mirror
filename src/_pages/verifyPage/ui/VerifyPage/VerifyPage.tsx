'use client'
import { Button, Paper, Stack, Typography } from "@mui/material";
import Image from "next/image";
import logo from "../../../../../public/tl-1.png";
import Link from "next/link";

export const VerifyPage = () => {
  return (
    <Stack justifyContent={"center"} alignItems={"center"} height={"100%"}>
      <Paper
        sx={{
          maxWidth: "515px",
          width: "100%",
          border: "none",
          padding: "34px",
        }}
        variant={"outlined"}
      >
        <Stack gap={"24px"}>
          <Stack alignItems={"center"}>
            <Image src={logo} alt="" />
            <Typography align={"center"} variant={"body1"}>
              You need to verificate yor email address Please check your email <strong>example@gmail.com</strong>
            </Typography>
          </Stack>
          <Button
            variant={"contained"}
            color={"primary"}
            compoent={Link}
            href="/auth"
            >
            Back to register
          </Button>
        </Stack>
      </Paper>
    </Stack>
  );
};
