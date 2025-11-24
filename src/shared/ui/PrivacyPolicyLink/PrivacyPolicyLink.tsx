import { Typography, Link as MuiLink } from "@mui/material"
import Link from "next/link"

export const PrivacyPolicyLink = () => {
  return (
    <Typography align={"center"} variant={"body1"}>
      Авторизуясь вы соглашаетесь с нашими <MuiLink href={'#'}>Правилами использования</MuiLink> и <MuiLink href={'#'}>Политикой конфиденцияльности</MuiLink>
    </Typography> 
  )
}