import type { SxProps } from "@mui/material";
import type { Theme } from "@mui/material/styles";

export const baseMuiModalContentStyle = (theme: Theme): SxProps => ({
  p: "2.4rem 4.4rem",
  border: "none",
  borderRadius: "4.4rem",
  outline: "none",
  backgroundColor: theme.palette.background.paper,
  alignSelf: "center",
  my: 4,
});

export const baseMuiModalStyle: SxProps = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  overflowY: "auto",
  minHeight: "100vh",
};
