import { Avatar, User } from "@/entities/user";
import { Box, Stack, StackProps, Typography } from "@mui/material";
import { FC, useEffect, useRef, useState } from "react";
import { PlayerStatus as PlayerStatusType } from "../../model";
import { League, LeagueBadge } from "@/entities/league";
import { PlayerStatus } from "../PlayerStatus/PlayerStatus";
import { AnimatePresence, motion } from "motion/react";
import { SearchLupa } from "./SearchLupa";
import av1 from "../../assets/avatar-1.png";
import av2 from "../../assets/avatar-2.png";
import av3 from "../../assets/avatar-3.png";
import av4 from "../../assets/avatar-4.png";
import av5 from "../../assets/avatar-5.png";
import av6 from "../../assets/avatar-6.png";
import av7 from "../../assets/avatar-7.png";
import av8 from "../../assets/avatar-8.png";
import av9 from "../../assets/avatar-9.png";
import av10 from "../../assets/avatar-10.png";
import av11 from "../../assets/avatar-11.png";
import av12 from "../../assets/avatar-12.png";
import { SearchDots } from "./SearchDots";

type Props = {
  status?: PlayerStatusType;
  data: Partial<Pick<User, "avatarUrl" | "profileName" | "leagueName">>;
  direction?: StackProps["direction"];
  size?: string;
  extraContentAlignItems?: StackProps["alignItems"];
  isSearching?: boolean;
};

const searchRoll = [
  { img: av1 },
  { img: av2 },
  { img: av3 },
  { img: av4 },
  { img: av5 },
  { img: av6 },
  { img: av7 },
  { img: av8 },
  { img: av9 },
  { img: av10 },
  { img: av11 },
  { img: av12 },
];

export const Player: FC<Props> = ({
  status,
  data,
  direction,
  size,
  extraContentAlignItems,
  isSearching,
}) => {
  const { avatarUrl, profileName, leagueName } = data;
  const searchRollTimer = useRef<any>(null);
  const [currentSearchAvatar, setCurrentSearchAvatar] = useState(0);

  useEffect(() => {
    if (searchRollTimer.current) {
      clearTimeout(searchRollTimer.current);
      searchRollTimer.current = null;
      return;
    }

    if (isSearching) {
      searchRollTimer.current = setTimeout(() => {
        setCurrentSearchAvatar((prev) => (prev + 1) % searchRoll.length);
      }, 2000);
    }

    return () => {
      clearTimeout(searchRollTimer.current);
      searchRollTimer.current = null;
    };
  }, [isSearching, currentSearchAvatar]);

  return (
    <Stack gap={"1rem"} direction={direction} alignItems={"center"}>
      <Box
        sx={(theme) => ({
          backgroundColor: theme.palette.common.white,
          borderRadius: "50%",
          overflow: "hidden",
          position: "relative",
        })}
      >
        <AnimatePresence mode="wait">
          {isSearching ? (
            searchRoll[currentSearchAvatar].img.src && (
              <motion.div
                style={{ opacity: 0.5 }}
                key={currentSearchAvatar}
                initial={{ x: "-100%" }}
                exit={{ x: "100%" }}
                animate={{ x: "0%" }}
                // animate={{x: ["-100%", "0%", "100%"]}}
                // transition={{times: [0, .5, 1], duration: .2, ease: "linear"}}
              >
                <Avatar
                  backgroundColor="transparent"
                  avatarUrl={searchRoll[currentSearchAvatar].img.src}
                  size={size}
                  isRounded={false}
                />
              </motion.div>
            )
          ) : (
            <motion.div>
              <Avatar
                backgroundColor="transparent"
                avatarUrl={avatarUrl}
                size={size}
              />
            </motion.div>
          )}
        </AnimatePresence>
        {isSearching && (
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
        )}
      </Box>
      <Stack
        component={motion.div}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        alignItems={extraContentAlignItems || "center"}
        gap={"1.2rem"}
        // mt={"1rem"}
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
