"use client";

import { useEffect, useState } from "react";

import { usePathname } from "next/navigation";

import { useTheme } from "@mui/material";

import { getPointsPage } from "../model";

// наверное лучше вынести в глобальный стор и диспатчить туда
export const usePageBgColor = () => {
  const pathname = usePathname();
  const { palette } = useTheme();
  const [pageBgColor, setPageBgColor] = useState<string>();

  useEffect(() => {
    if (!pathname.startsWith(getPointsPage())) {
      setPageBgColor(palette.gold.light);
    } else {
      setPageBgColor(palette.background.default);
    }
  }, [pathname, palette]);

  return { pageBgColor };
};
