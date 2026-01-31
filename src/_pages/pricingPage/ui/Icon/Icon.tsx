import { FC, PropsWithChildren } from "react";

import { Box } from "@mui/material";

export const Icon: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Box sx={{ width: "5.4rem", height: "5.4rem", "& svg": { width: "100%", height: "100%" } }}>
      {children}
    </Box>
  );
};
