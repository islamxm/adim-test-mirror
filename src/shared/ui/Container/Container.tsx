import { Box, SxProps } from "@mui/material"
import { FC, PropsWithChildren } from "react"

type Props = PropsWithChildren<{
  sx?: SxProps
}>

export const Container:FC<Props> = ({children, sx}) => {
  return (
    <Box
      sx={{
        maxWidth: "147rem",
        width: "100%",
        px: "1.5rem",
        m: "0 auto",
        ...sx
      }}
      >
      {children}
    </Box>
  )
}