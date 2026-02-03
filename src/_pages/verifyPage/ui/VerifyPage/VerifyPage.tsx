"use client";
import { FC } from "react";

import Image from "next/image";

import { Button, Paper, Stack, Typography, useTheme } from "@mui/material";

import { useRouterProgress } from "@/shared/lib";
import { getRegisterPage } from "@/shared/model";

import { PageEnterAnimationLayout } from "@/widgets/pageEnterAnimationLayout";

import logo from "../../../../../public/tl-1.png";

type Props = {
  email: string | null;
};

export const VerifyPage: FC<Props> = ({ email }) => {
  const { palette } = useTheme();
  const router = useRouterProgress();
  return (
    <PageEnterAnimationLayout>
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
                  <a
                    target={"_blank"}
                    style={{ color: palette.primary.light }}
                    href={`mailto:${email}`}
                  >
                    {email}
                  </a>
                </strong>
              </Typography>
            </Stack>
            {/* @ts-ignore */}
            <Button
              variant={"contained"}
              color={"primary"}
              onClick={() => router.push(getRegisterPage())}
            >
              Back to register
            </Button>
          </Stack>
        </Paper>
      </Stack>
    </PageEnterAnimationLayout>
  );
};
