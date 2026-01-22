import { FC } from "react";

import { Box, Paper, Stack, Typography, useTheme } from "@mui/material";
import dayjs from "dayjs";
import { motion } from "motion/react";

import { GameResult, MatchData, Player, PlayerName, Versus } from "@/entities/competition";
import { User, userApi } from "@/entities/user";

import { MatchResultTitle } from "../MatchResultTitle/MatchResultTitle";

type Props = {
  data: MatchData;
  onClick?: () => void;
};

export const HistoryItem: FC<Props> = ({ data, onClick }) => {
  const theme = useTheme();
  const { data: self } = userApi.useGetUserProfileQuery({});
  const { opponent, winnerId, startedAt } = data;

  const selfGameResult: GameResult =
    winnerId === null ? "DRAW" : winnerId === self?.id ? "WIN" : "LOSE";
  const opponentGameResult: GameResult =
    winnerId === null ? "DRAW" : winnerId === opponent.id ? "WIN" : "LOSE";

  return (
    <Paper
      component={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      sx={{
        borderRadius: "3.4rem",
        p: "0 1.5rem",
        cursor: "pointer",
        width: "100%",
      }}
      whileHover={{
        backgroundColor: theme.palette.emerald.light,
      }}
      onClick={onClick}
    >
      <Stack direction={"row"} gap={"1rem"} alignItems={"center"}>
        <Box sx={{ flex: 1 }}>
          <Player
            data={{ avatarUrl: self?.avatarUrl }}
            size="12.4rem"
            extraContent={
              <Stack gap={".4rem"}>
                <PlayerName profileName={self?.profileName} />
                <MatchResultTitle status={selfGameResult} />
              </Stack>
            }
          />
        </Box>
        <Box sx={{ width: "9.6rem", flex: "0 0 auto" }}>
          <Stack justifyContent={"center"} alignItems={"center"} sx={{ scale: 0.6 }}>
            <Typography
              align={"center"}
              sx={{ fontSize: "1.8rem", fontWeight: 600, color: "#6C6C6C" }}
            >
              {dayjs(startedAt).format("DD.MM.YYYY hh:mm")}
            </Typography>
            <Versus disableAnimation />
          </Stack>
        </Box>
        <Box sx={{ flex: 1 }}>
          <Player
            data={{ avatarUrl: opponent.avatarUrl }}
            size="12.4rem"
            extraContent={
              <Stack gap={".4rem"}>
                <PlayerName profileName={opponent?.profileName} />
                <MatchResultTitle status={opponentGameResult} />
              </Stack>
            }
          />
        </Box>
      </Stack>
    </Paper>
  );
};
