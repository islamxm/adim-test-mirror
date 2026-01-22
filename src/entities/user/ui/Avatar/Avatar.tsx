import { FC } from "react";

import { Avatar as MuiAvatar, Stack, Typography } from "@mui/material";

import { AvatarComponentProps } from "../../model";

export const Avatar: FC<AvatarComponentProps> = ({
  size,
  avatarUrl,
  label,
  extra,
  direction,
  gap = ".5rem",
  backgroundColor,
  isRounded = true,
  shadowType,
  isDisabled,
  isActive,
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
          filter: isDisabled ? "grayscale(1)" : "none",
          transition: "all .2s ease",
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
          border: `2px solid ${isActive ? theme.palette.primary.main : "transparent"}`,
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
