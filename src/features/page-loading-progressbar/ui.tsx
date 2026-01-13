"use client";

import NextTopLoader from "nextjs-toploader";

import { useTheme } from "@mui/material";

export const PageLoadingProgressbar = () => {
  const { palette } = useTheme();
  return (
    <NextTopLoader
      color={palette.primary.main}
      initialPosition={0.08}
      crawlSpeed={200}
      height={3}
      crawl={true}
      showSpinner={false}
      easing="ease"
      speed={200}
      shadow={`0 0 10px ${palette.primary.light},0 0 5px ${palette.primary.light}`}
    />
  );
};
