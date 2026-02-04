import { useTranslations } from "next-intl";

import { Link as MuiLink, Typography } from "@mui/material";

export const PrivacyPolicyLink = () => {
  const t = useTranslations("entities.user.PrivacyPolicyLink");
  return (
    <Typography align={"center"} variant={"body1"}>
      {t("first")} <MuiLink href={"#"}>{t("second")}</MuiLink> {t("third")}{" "}
      <MuiLink href={"#"}>{t("fourth")} </MuiLink> {t("fifth")}
    </Typography>
  );
};
