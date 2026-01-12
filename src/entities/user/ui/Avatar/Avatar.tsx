import { FC, ReactNode } from "react";

import { Avatar as MuiAvatar, Stack, StackProps, Typography } from "@mui/material";

import { type User } from "../../model";

type ShadowType = "light" | "dark" | string;

type Props = {
  avatarUrl?: User["avatarUrl"];
  size?: string;
  label?: ReactNode;
  extra?: ReactNode;
  shadowType?: ShadowType;
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
  direction,
  gap = ".5rem",
  backgroundColor,
  isRounded = true,
  shadowType,
}) => {
  const boxShadow = () => {
    switch (shadowType) {
      case "dark":
        return "0 0 10px #00000026";
      case "light":
        return "0 0 10px #fff";
      default:
        return shadowType;
    }
  };

  return (
    <Stack direction={direction} gap={gap} alignItems={"center"}>
      <MuiAvatar
        sx={(theme) => ({
          width: size,
          height: size,
          backgroundColor: backgroundColor || theme.palette.common.white,
          boxShadow: boxShadow(),
          alignItems: "flex-start",
          "& img": {
            width: "110%",
            height: "110%",
            scale: 0.8,
            transform: "translateY(10px)",
          },
          "& svg": {
            width: "110%",
            height: "110%",
            scale: 0.8,
            transform: "translateY(10px)",
          },
          borderRadius: isRounded ? "50%" : "0",
        })}
        src={avatarUrl}
      />
      {label && (
        <Typography
          textAlign={"center"}
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
