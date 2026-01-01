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
  backgroundColor?: string;
  isRounded?: boolean;
};

export const Avatar: FC<Props> = ({
  size,
  avatarUrl,
  label,
  extra,
  isShadow,
  direction,
  gap = ".5rem",
  backgroundColor,
  isRounded = true
}) => {
  return (
    <Stack direction={direction} gap={gap} alignItems={"center"}>
      <MuiAvatar
        sx={(theme) => ({
          width: size,
          height: size,
          backgroundColor: backgroundColor || theme.palette.common.white,
          boxShadow: isShadow ? "0 0 10px #00000026" : "none",
          "& img": {
            width: "110%",
            height: "110%",
          },
          borderRadius: isRounded ? "50%" : "0",
        })}
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
