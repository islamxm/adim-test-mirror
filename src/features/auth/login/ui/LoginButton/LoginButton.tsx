import { useTranslations } from "next-intl";
import Link from "next/link";

import { Button } from "@mui/material";

import { getLoginPage } from "@/shared/model";

export const LoginButton = () => {
  const t = useTranslations("features.auth.login.LoginButton");

  return (
    <Button
      variant={"outlined"}
      color={"primary"}
      component={Link}
      href={getLoginPage()}
      sx={{ borderRadius: "3rem" }}
    >
      {t("text")}
    </Button>
  );
};
