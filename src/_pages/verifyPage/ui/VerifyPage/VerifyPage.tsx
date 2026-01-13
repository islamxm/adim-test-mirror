"use client";
import { FC } from "react";

import Image from "next/image";
import Link from "next/link";

import { Button, Paper, Stack, Typography } from "@mui/material";

import { getRegisterPage } from "@/shared/model";

import logo from "../../../../../public/tl-1.png";

type Props = {
  email?: string;
};

export const VerifyPage: FC<Props> = ({ email }) => {
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
              You need to verificate yor email address Please check your email{" "}
              <strong>
                <a href={`mailto:${email}`}>{email}</a>
              </strong>
            </Typography>
          </Stack>
          {/* @ts-ignore */}
          <Button variant={"contained"} color={"primary"} compoent={Link} href={getRegisterPage()}>
            Back to register
          </Button>
        </Stack>
      </Paper>
    </Stack>
  );
};
