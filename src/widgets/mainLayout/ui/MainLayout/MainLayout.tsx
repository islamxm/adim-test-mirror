import { Box } from "@mui/material"
import { FC, PropsWithChildren, ReactNode } from "react"

type Props = PropsWithChildren<{
  header?: ReactNode;
  footer?: ReactNode;
}>

export const MainLayout:FC<Props> = ({
  children,
  header,
  footer
}) => {
  return (
    <Box>
      {header && header}
      {children && (
        <main>{children}</main>
      )}
      {footer && footer}
    </Box>
  )
}