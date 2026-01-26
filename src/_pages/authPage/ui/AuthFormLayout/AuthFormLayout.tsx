"use client";
import { FC, ReactNode, useEffect, useState } from "react";

import { useTranslations } from "next-intl";
import { usePathname, useSearchParams } from "next/navigation";

import { Paper, Stack, Tab, Tabs, Typography } from "@mui/material";
import { motion } from "motion/react";

import { useRouterProgress } from "@/shared/lib";
import { getLoginPage } from "@/shared/model";
import { UIStatus } from "@/shared/types";

import { AuthType } from "@/entities/user";

import { PanelFormLoading } from "../PanelFormLoading/PanelFormLoading";

type Props = {
  children?: (body: { setStatus: (status: UIStatus) => void; type: AuthType }) => ReactNode;
  extra?: ReactNode;
  bg?: (body: { setStatus: (status: UIStatus) => void; type: AuthType }) => ReactNode;
};

export const AuthFormLayout: FC<Props> = ({ children, extra, bg }) => {
  const t = useTranslations("pages.authPage.AuthFormLayout");
  const router = useRouterProgress();
  const pathname = usePathname();
  const params = useSearchParams();
  const type = params.get("type") as AuthType;
  const [status, setStatus] = useState<UIStatus>("idle");

  useEffect(() => {
    if (!type) {
      router.push(getLoginPage());
    }
  }, [type, router]);

  if (!type) {
    return null;
  }
  return (
    <>
      <Paper
        component={motion.div}
        sx={{
          maxWidth: "515px",
          width: "100%",
          border: "none",
          padding: "34px",
          position: "relative",
          overflow: "hidden",
          zIndex: 2,
        }}
        elevation={0}
        layout
      >
        {status === "loading" && <PanelFormLoading />}
        <Stack gap={"24px"}>
          <Stack alignItems={"center"} gap={"8px"}>
            <Typography variant="h3" align={"center"}>
              {t("title")}
            </Typography>
            <Tabs
              value={type}
              onChange={(_, type) => {
                const url = `${pathname}?type=${type}`;
                window.history.replaceState(null, "", url);
              }}
              aria-label="product category tabs"
              sx={(theme) => ({
                maxWidth: "260px",
                width: "100%",
                minHeight: "auto",
                bgcolor: theme.palette.grey[100],
                borderRadius: "2.1rem",
                p: "5px",
                "& .MuiTab-root": {
                  minHeight: "auto",
                  p: ".6rem",
                  zIndex: 2,
                  color: theme.palette.text.disabled,
                  borderRadius: "1.8rem",
                  width: "50%",
                  background: "none",
                  transition: theme.transitions.create("color", {
                    duration: theme.transitions.duration.standard,
                    easing: theme.transitions.easing.easeInOut,
                  }),
                  "&.Mui-selected": {
                    color: theme.palette.common.white,
                  },
                },
                "& .MuiTabs-indicator": {
                  height: "100%",
                  borderRadius: 99,
                  bgcolor: theme.palette.primary.main,
                  width: "50%",
                  zIndex: 1,
                  transition: theme.transitions.create(["left", "width"], {
                    duration: theme.transitions.duration.standard,
                    easing: theme.transitions.easing.easeInOut,
                  }),
                },
              })}
            >
              <Tab label={t("loginTabText")} value={"login"} />
              <Tab label={t("registerTabText")} value={"register"} />
            </Tabs>
          </Stack>
          {children?.({
            setStatus,
            type,
          })}
          {extra}
        </Stack>
      </Paper>
      {bg?.({ setStatus, type })}
    </>
  );
};
