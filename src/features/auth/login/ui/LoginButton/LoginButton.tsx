import { getLoginPage } from "@/shared/model"
import { Button } from "@mui/material"
import Link from "next/link"

export const LoginButton = () => {
  return (
    <Button variant={"outlined"} color={"primary"} component={Link} href={getLoginPage()} sx={{borderRadius: "3rem"}}>
      Sign in
    </Button>
  )
}