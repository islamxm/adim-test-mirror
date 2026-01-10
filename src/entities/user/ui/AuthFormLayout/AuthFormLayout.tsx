"use client";
import { Paper, Stack, Typography, Tabs, Tab } from "@mui/material";
import { FC, ReactNode, useState } from "react";
import { PrivacyPolicyLink } from "@/shared/ui/PrivacyPolicyLink";
import { AuthType } from "../../model";
import { motion } from "motion/react";
import { UIStatus } from "@/shared/types";
import { PanelFormLoading } from "../PanelFormLoading/PanelFormLoading";
import { useRouter, useSearchParams } from "next/navigation";

type Props = {
  children?: (body: {
    setStatus: (status: UIStatus) => void;
    type: AuthType;
  }) => ReactNode;
  extra?: ReactNode;
  bg?: (body: {
    setStatus: (status: UIStatus) => void;
    type: AuthType;
  }) => ReactNode;
};

export const AuthFormLayout: FC<Props> = ({ children, extra, bg }) => {
  const router = useRouter();
  const params = useSearchParams();
  const type = params.get("type") as AuthType;
  const [status, setStatus] = useState<UIStatus>("idle");

  return (
    <>
      <Paper
        component={motion.div}
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        sx={{
          maxWidth: "515px",
          width: "100%",
          border: "none",
          padding: "34px",
          position: "relative",
          overflow: "hidden",
          zIndex: 2,
        }}
        variant={"outlined"}
        layout
      >
        {status === "loading" && <PanelFormLoading />}
        <Stack gap={"24px"}>
          <Stack alignItems={"center"} gap={"8px"}>
            <Typography variant="h3" align={"center"}>
              Welcome to Adim
            </Typography>
            <Tabs
              value={type}
              onChange={(_, type) => {
                router.push("/auth?type=" + type);
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
                  py: "0.6rem",
                  px: "0.6rem",
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
                  zIndex: 1,
                  transition: theme.transitions.create(["left", "width"], {
                    duration: theme.transitions.duration.standard,
                    easing: theme.transitions.easing.easeInOut,
                  }),
                },
              })}
            >
              <Tab label="Login" value={"login"} />
              <Tab label="Register" value={"register"} />
            </Tabs>
          </Stack>
          {children?.({
            setStatus,
            type,
          })}
          {extra}
          <PrivacyPolicyLink />
        </Stack>
      </Paper>
      {bg?.({ setStatus, type })}
    </>
  );
};
