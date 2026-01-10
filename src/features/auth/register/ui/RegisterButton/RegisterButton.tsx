import { getRegisterPage } from "@/shared/model"
import { Button } from "@mui/material"
import Link from "next/link"

export const RegisterButton = () => {
  return (
    <Button variant={"contained"} color={"primary"} sx={{borderRadius: "3rem"}} component={Link} href={getRegisterPage()}>
      Sign up
    </Button>
  )
}