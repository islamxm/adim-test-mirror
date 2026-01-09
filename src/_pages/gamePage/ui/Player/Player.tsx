import { Avatar, User } from "@/entities/user";
import { Box, Stack, StackProps, Typography } from "@mui/material";
import { FC } from "react";
import { PlayerStatus as PlayerStatusType } from "../../model";
import { League, LeagueBadge } from "@/entities/league";
import { PlayerStatus } from "../PlayerStatus/PlayerStatus";
import { AnimatePresence, motion } from "motion/react";
import { SearchDots } from "./SearchDots";
import { SearchPlayer } from "../SearchPlayer/SearchPlayer";

type Props = {
  status?: PlayerStatusType;
  data: Partial<Pick<User, "avatarUrl" | "profileName" | "leagueName">>;
  direction?: StackProps["direction"];
  size?: string;
  extraContentAlignItems?: StackProps["alignItems"];
  isSearching?: boolean;
};

export const Player: FC<Props> = ({
  status,
  data,
  direction,
  size,
  extraContentAlignItems,
  isSearching,
}) => {
  const { avatarUrl, profileName, leagueName } = data;

  return (
    <Stack gap={"1rem"} direction={direction} alignItems={"center"}>
      <Box
        sx={(theme) => ({
          backgroundColor: theme.palette.common.white,
          borderRadius: "50%",
          // overflow: "hidden",
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
              />
            </motion.div>
          )}
        </AnimatePresence>
        {/* {isSearching && (
          <Box
            component={motion.div}
            sx={{ position: "absolute", inset: 0, scale: 0.5 }}
            animate={{ offsetDistance: "0%" }}
            initial={{ offsetDistance: "100%" }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{
              offsetPath: "circle(30px at center)",
              offsetRotate: "0deg",
            }}
          >
            <SearchLupa />
          </Box>
        )} */}
      </Box>
      <Stack
        component={motion.div}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        alignItems={extraContentAlignItems || "center"}
        gap={"1.2rem"}
      >
        <Typography sx={{ height: "2.5rem" }} textAlign={"center"} variant="h3">
          {profileName || <SearchDots />}
        </Typography>
        <Box sx={{ position: "relative", zIndex: 1, height: "4.2rem" }}>
          {!isSearching && leagueName && (
            <LeagueBadge leagueName={leagueName as League} />
          )}
        </Box>
        <PlayerStatus status={status} />
      </Stack>
    </Stack>
  );
};
