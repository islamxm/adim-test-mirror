import { Stack } from "@mui/material"
import { Navbar } from "../Navbar/Navbar"
import { StreakBadge } from "@/entities/user"
import { LeagueBadge } from "@/entities/league"

export const AppHeader = () => {
  return (
    <Stack
      sx={{
        p: "4rem 3rem",
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        alignItems: "center",
        zIndex: 10
      }}
      direction={"row"}
      justifyContent={"center"}
      >
      <StreakBadge/>
      <Navbar />
      <LeagueBadge/>
    </Stack>
  )
}