import { FC, PropsWithChildren } from "react";

import { Box, SxProps } from "@mui/material";

type Props = PropsWithChildren<{
  sx?: SxProps;
}>;

export const Container: FC<Props> = ({ children, sx }) => {
  return (
    <Box
      sx={{
        maxWidth: "144rem",
        width: "100%",
        px: "3.6rem",
        m: "0 auto",
        ...sx,
      }}
    >
      {children}
    </Box>
  );
};
