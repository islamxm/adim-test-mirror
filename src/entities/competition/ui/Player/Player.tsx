import { FC, ReactNode } from "react";

import { Box, Stack, StackProps } from "@mui/material";
import { AnimatePresence, motion } from "motion/react";

import { Avatar, User } from "@/entities/user/@x/competition";

import { PlayerStatusType } from "../../model";
import { SearchPlayer } from "../SearchPlayer/SearchPlayer";

type Props = {
  status?: PlayerStatusType;
  data: Partial<Pick<User, "avatarUrl">>;
  direction?: StackProps["direction"];
  size?: string;
  extraContentAlignItems?: StackProps["alignItems"];
  isSearching?: boolean;
  extraContent?: ReactNode;
  isDisabled?: boolean;
  avatarSlot?: ReactNode;
};

export const Player: FC<Props> = ({
  data,
  direction,
  size,
  extraContentAlignItems,
  isSearching,
  extraContent,
  isDisabled,
  avatarSlot,
}) => {
  // надо вынести из обьекта data и сделать отдельным пропом
  const { avatarUrl } = data;

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
            <SearchPlayer size={size} />
          ) : (
            <motion.div>
              <Avatar
                backgroundColor="transparent"
                avatarUrl={avatarUrl}
                size={size}
                shadowType={"light"}
                isDisabled={isDisabled}
              />
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
