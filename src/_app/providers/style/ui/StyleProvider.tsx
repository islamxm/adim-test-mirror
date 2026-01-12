import { FC, PropsWithChildren } from "react";

import { ThemeProvider } from "@mui/material";
import { CssBaseline } from "@mui/material";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v16-appRouter";

import { cahceProviderOptions, themeConfig } from "../config";

type Props = PropsWithChildren;

export const StyleProvider: FC<Props> = ({ children }) => {
  return (
    <AppRouterCacheProvider options={cahceProviderOptions}>
      <ThemeProvider theme={themeConfig}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </AppRouterCacheProvider>
  );
};
