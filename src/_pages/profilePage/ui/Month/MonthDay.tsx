import { FC } from "react";

import { Box, Stack, useTheme } from "@mui/material";

type Props = {
  isActive?: boolean;
};

export const MonthDay: FC<Props> = ({ isActive }) => {
  const { palette } = useTheme();
  return (
    <Stack
      sx={{
        width: "2.8rem",
        height: "2.8rem",
        border: `3px solid ${isActive ? palette.primary.main : "#E2DEDE"}`,
        borderRadius: "1rem",
      }}
      justifyContent={"center"}
      alignItems={"center"}
    >
      {isActive && (
        <Box
          sx={{
            width: "2rem",
            height: "2rem",
            borderRadius: ".6rem",
            backgroundColor: palette.primary.main,
          }}
        />
      )}
    </Stack>
  );
};
