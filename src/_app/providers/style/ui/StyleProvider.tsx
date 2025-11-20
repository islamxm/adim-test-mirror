import { ThemeProvider } from "@mui/material";
import { FC, PropsWithChildren } from "react";
import { cahceProviderOptions, themeConfig } from "../config";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v16-appRouter";
import {CssBaseline} from "@mui/material";

type Props = PropsWithChildren;

export const StyleProvider: FC<Props> = ({ children }) => {
  return (
    <AppRouterCacheProvider options={cahceProviderOptions}>
      <ThemeProvider theme={themeConfig}>
        <CssBaseline/>
        {children}
      </ThemeProvider>
    </AppRouterCacheProvider>
  );
};
