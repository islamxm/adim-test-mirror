import { FC } from "react";

import Image from "next/image";

import { Box, Avatar as MuiAvatar, Stack, Typography } from "@mui/material";
import { motion } from "motion/react";

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
      <Box
        component={motion.div}
        sx={(theme) => ({
          width: size,
          height: size,
          borderRadius: "50%",
          boxShadow: boxShadow(),
          filter: isDisabled ? "grayscale(1)" : "none",
          transition: "all .2s ease",
          overflow: "hidden",
          flex: "0 0 auto",
          backgroundColor: backgroundColor || theme.palette.common.white,
          border: `2px solid ${isActive ? theme.palette.primary.main : "transparent"}`,
          "& img": {
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
          },
        })}
      >
        {avatarUrl && <img src={avatarUrl} alt="" width={50} height={50} />}
      </Box>
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
