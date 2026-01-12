import { Typography } from "@mui/material"
import { useTranslations } from "next-intl"

export const Copyright = () => {
  const t = useTranslations("widgets.appFooter.Copyright");

  return (
    <Typography variant={"body1"} sx={theme => ({color: theme.palette.text.disabled})}>
      {t("text")}
    </Typography>
  )
}