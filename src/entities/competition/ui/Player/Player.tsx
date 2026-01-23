import { FC, ReactNode } from "react";

import { Box, Stack } from "@mui/material";
import { AnimatePresence } from "motion/react";

import { AvatarComponentProps } from "@/entities/user";
import { Avatar } from "@/entities/user/@x/competition";

import { PlayerStatusType } from "../../model";
import { SearchPlayer } from "../SearchPlayer/SearchPlayer";

type Props = {
  status?: PlayerStatusType;
  avatarProps: AvatarComponentProps;
  extraContent?: ReactNode;
  isSearching?: boolean;
};

const defaultAvatarProps: AvatarComponentProps = {
  backgroundColor: "transparent",
  avatarUrl: "",
  size: "10rem",
  shadowType: "light",
  isDisabled: false,
};

export const Player: FC<Props> = ({ avatarProps, isSearching, extraContent }) => {
  const avatarMergedProps = { ...defaultAvatarProps, ...avatarProps };

  return (
    <Stack sx={{ position: "relative" }} gap={"1rem"} alignItems={"center"}>
      <Box
        sx={(theme) => ({
          backgroundColor: theme.palette.common.white,
          borderRadius: "50%",
          position: "relative",
          width: avatarProps.size,
          height: avatarProps.size,
        })}
      >
        <AnimatePresence mode="wait">
          {isSearching ? (
            <SearchPlayer size={avatarProps.size} />
          ) : (
            <Avatar {...avatarMergedProps} />
          )}
        </AnimatePresence>
      </Box>
      {extraContent}
    </Stack>
  );
};
