import { Typography } from "@mui/material"

export const Copyright = () => {
  return (
    <Typography variant={"body1"} sx={theme => ({color: theme.palette.text.disabled})}>
      © 2025 Ädim. All rights reserved.
    </Typography>
  )
}