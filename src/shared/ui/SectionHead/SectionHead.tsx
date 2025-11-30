import { Stack, SxProps, Typography } from "@mui/material";
import { FC, ReactNode } from "react";


type Props = {
  title?: string;
  subtitle?: string;
  action?: ReactNode;
  sx?: SxProps
};

export const SectionHead:FC<Props> = ({
  title,
  subtitle,
  action,
  sx
}) => {
  return (
    <Stack alignItems={"center"} justifyContent={"space-between"} sx={{mb: "4rem", ...sx}} direction={"row"} gap={"2rem"}>
      <Stack gap={".8rem"}>
        <Typography textTransform={"uppercase"} variant={"h2"}>{title}</Typography>
        <Typography variant={"body1"}>{subtitle}</Typography>
      </Stack>
      {action}
    </Stack>
  );
};
