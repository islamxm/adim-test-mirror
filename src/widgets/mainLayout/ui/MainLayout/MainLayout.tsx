"use client";
import { FC, PropsWithChildren, ReactNode } from "react";

import { usePathname } from "next/navigation";

import { Box, Stack } from "@mui/material";

type Props = PropsWithChildren<{
  header?: ReactNode;
  footer?: ReactNode;
}>;

export const MainLayout: FC<Props> = ({ children, header, footer }) => {
  const pathname = usePathname();
  const isAuthPage = pathname === "/auth";

  return (
    <Stack
      sx={(theme) => ({
        backgroundColor: theme.palette.gold.light,
        height: "100vh",
        overflowY: "scroll",
      })}
    >
      {header && !isAuthPage && header}
      {children && (
        <Box sx={{ flexGrow: 1, flexShrink: 0 }} component={"main"}>
          {children}
        </Box>
      )}
      {footer && !isAuthPage && <Box sx={{ flexShrink: 0 }}>{footer}</Box>}
    </Stack>
  );
};
