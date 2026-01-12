import Link from "next/link";

import { Link as MuiLink, Typography } from "@mui/material";

export const PrivacyPolicyLink = () => {
  return (
    <Typography align={"center"} variant={"body1"}>
      Авторизуясь вы соглашаетесь с нашими <MuiLink href={"#"}>Правилами использования</MuiLink> и{" "}
      <MuiLink href={"#"}>Политикой конфиденцияльности</MuiLink>
    </Typography>
  );
};
