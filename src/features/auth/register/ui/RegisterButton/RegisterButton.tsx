import { getRegisterPage } from "@/shared/model"
import { Button } from "@mui/material"
import { useTranslations } from "next-intl"
import Link from "next/link"

export const RegisterButton = () => {
  const t = useTranslations("features.auth.register.RegisterButton");

  return (
    <Button variant={"contained"} color={"primary"} sx={{borderRadius: "3rem"}} component={Link} href={getRegisterPage()}>
      {t("text")}
    </Button>
  )
}