"use client";
import { createTheme } from "@mui/material";
import { AppRouterCacheProviderProps } from "@mui/material-nextjs/v13-appRouter";

export const themeConfig = createTheme({
  typography: {
    fontSize: 10,
    fontFamily: "var(--font-geist-sans)",
    h1: {
      fontWeight: "bold",
    },
    h2: {
      fontWeight: "bold",
    },
    h3: {
      fontWeight: "bold",
    },
    h4: {
      fontWeight: "bold",
    },
    h5: {
      fontWeight: "bold",
    },
    h6: {
      fontWeight: "bold",
    },
  },
  shape: {
    borderRadius: "1.4rem",
  },
  palette: {
    text: {
      primary: "#042f21",
      secondary: "#063B29",
      disabled: "#616161"
    },
    primary: {
      main: "#063B29",
      dark: "#042f21",
      light: "#158A13",
      contrastText: "#ffffff",
    },
    // warning: {
    //   A100: "#FFD24E",
    // },
    // grey: {
    //   A100: "#616161",
    // },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontSize: "1.4rem",
        },
      },
    },
  },
});

export const cahceProviderOptions: AppRouterCacheProviderProps["options"] = {
  enableCssLayer: true
}
