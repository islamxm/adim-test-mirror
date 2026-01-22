import { FC, ReactNode } from "react";

import { Box, Stack, StackProps } from "@mui/material";
import { AnimatePresence, motion } from "motion/react";

import { AvatarComponentProps } from "@/entities/user";
import { Avatar } from "@/entities/user/@x/competition";

import { PlayerStatusType } from "../../model";
import { SearchPlayer } from "../SearchPlayer/SearchPlayer";

type Props = {
  status?: PlayerStatusType;
  avatarProps: AvatarComponentProps;
  direction?: StackProps["direction"];
  // cледующие два пропа нужно обьединить
  extraContentAlignItems?: StackProps["alignItems"];
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

export const Player: FC<Props> = ({
  avatarProps,
  direction,
  isSearching,
  extraContentAlignItems,
  extraContent,
}) => {
  const avatarMergedProps = { ...defaultAvatarProps, ...avatarProps };

  return (
    <Stack gap={"1rem"} direction={direction} alignItems={"center"}>
      <Box
        sx={(theme) => ({
          backgroundColor: theme.palette.common.white,
          borderRadius: "50%",
          position: "relative",
        })}
      >
        <AnimatePresence mode="wait">
          {isSearching ? (
            <SearchPlayer size={avatarProps.size} />
          ) : (
            <motion.div>
              <Avatar {...avatarMergedProps} />
            </motion.div>
          )}
        </AnimatePresence>
      </Box>
      <Stack
        component={motion.div}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        alignItems={extraContentAlignItems || "center"}
        gap={"1.2rem"}
      >
        {extraContent}
      </Stack>
    </Stack>
  );
};
