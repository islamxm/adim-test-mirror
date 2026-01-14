"use client";
import { FC, PropsWithChildren, ReactNode, useRef } from "react";

import { usePathname } from "next/navigation";

import { Box, Stack } from "@mui/material";

import { useToggleHeader } from "../../lib/useToggleHeader";

type Props = PropsWithChildren<{
  header?: (isShowHeader: boolean) => ReactNode;
  footer?: ReactNode;
}>;

export const MainLayout: FC<Props> = ({ children, header, footer }) => {
  const pathname = usePathname();
  const isAuthPage = pathname.includes("/auth");
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const { isShowHeader } = useToggleHeader(scrollRef);

  return (
    <Stack
      sx={(theme) => ({
        backgroundColor: theme.palette.gold.light,
        height: "100vh",
        overflowY: "scroll",
      })}
      ref={scrollRef}
    >
      {header && !isAuthPage && header?.(isShowHeader)}
      {children && (
        <Box sx={{ flexGrow: 1, flexShrink: 0 }} component={"main"}>
          {children}
        </Box>
      )}
      {footer && !isAuthPage && <Box sx={{ flexShrink: 0 }}>{footer}</Box>}
    </Stack>
  );
};
