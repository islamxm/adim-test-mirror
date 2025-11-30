"use client";
import { createTheme } from "@mui/material";
import { AppRouterCacheProviderProps } from "@mui/material-nextjs/v13-appRouter";

declare module "@mui/material/styles" {
  interface PaletteColor {
    100: string;
  }
  interface Palette {
    primary: PaletteColor;
  }
}

const customShadow = "0px 0px 10px 0px rgba(0, 0, 0, 0.15)"

export const themeConfig = createTheme({
  typography: {
    fontSize: 10,
    fontFamily: "var(--font-geist-sans)",
    allVariants: {
      transition: "all .2s ease",
    },
    h1: {
      fontWeight: "bold",
    },
    h2: {
      fontWeight: "bold",
      fontSize: "3.4rem"
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
    body1: {
      fontSize: "1.4rem",
    },
    body2: {
      fontSize: "1rem",
    },
    subtitle1: {
      fontSize: "2.4rem",
      lineHeight: "3.2rem"
    },
  },
  shape: {
    borderRadius: "1.6rem",
  },
  palette: {
    text: {
      primary: "#042f21",
      secondary: "#063B29",
      disabled: "#616161",
    },
    primary: {
      main: "#063B29",
      dark: "#042f21",
      light: "#158A13",
      contrastText: "#ffffff",
      100: "#89c788ff",
    },
    secondary: {
      main: "#F2F2F2",
      contrastText: "#000000",
    },
    grey: {
      A100: "#F2F2F2",
    },
    background: {
      default: "#FAF0E6",
    },
  },
  shadows: [
    "none",
    customShadow,
    customShadow,
    customShadow,
    customShadow,
    customShadow,
    customShadow,
    customShadow,
    customShadow,
    customShadow,
    customShadow,
    customShadow,
    customShadow,
    customShadow,
    customShadow,
    customShadow,
    customShadow,
    customShadow,
    customShadow,
    customShadow,
    customShadow,
    customShadow,
    customShadow,
    customShadow,
    customShadow,
  ],
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontSize: "1.6rem",
          padding: "1.6rem",
          lineHeight: "100%",
          borderRadius: "1.6rem",
          boxShadow: "none",
          minHeight: "5.2rem",
          transition: "all 0.2s ease",
          "&:hover": {
            boxShadow: "none",
          },
          "&:active": {
            transform: "scale(0.98)",
          },
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          fontSize: "1.6rem",
          textTransform: "none",
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          color: "#158A13",
          textDecoration: "none",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          ["& .MuiInputBase-root"]: {
            backgroundColor: "#F2F2F2",
          },
          ["& .MuiInputBase-input"]: {
            ["&::placeholder"]: {
              opacity: 1,
              color: "#616161",
            },
          },
          ["& .MuiOutlinedInput-notchedOutline"]: {
            borderColor: "transparent",
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          transition: "all .2s ease",
        }
      }
    }
  },
});

export const cahceProviderOptions: AppRouterCacheProviderProps["options"] = {
  enableCssLayer: true,
};
