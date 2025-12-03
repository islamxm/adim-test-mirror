import {
  Avatar as MuiAvatar,
  Stack,
  StackProps,
  Typography,
} from "@mui/material";
import { FC, ReactNode } from "react";
import { type User } from "../../model";

type Props = {
  avatarUrl?: User["avatarUrl"];
  size?: string;
  label?: ReactNode;
  extra?: ReactNode;
  isShadow?: boolean;
  direction?: StackProps["direction"];
  gap?: StackProps["gap"];
};

export const Avatar: FC<Props> = ({
  size,
  avatarUrl,
  label,
  extra,
  isShadow,
  direction,
  gap = ".5rem"
}) => {
  return (
    <Stack direction={direction} gap={gap} alignItems={"center"}>
      <MuiAvatar
        sx={{
          width: size,
          height: size,
          objectFit: "cover",
          boxShadow: isShadow ? "0 0 10px #00000026" : "none",
        }}
        src={avatarUrl}
      />
      {label && (
        <Typography
          variant={"body1"}
          sx={{ fontSize: "2.2rem", fontWeight: 600 }}
        >
          {label}
        </Typography>
      )}
      {extra}
    </Stack>
  );
};
