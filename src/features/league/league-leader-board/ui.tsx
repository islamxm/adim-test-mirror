import { LeaderBoardUser } from "@/entities/league";
import { Avatar, PointsBadge } from "@/entities/user";
import { Box, Paper, Stack, Typography } from "@mui/material";
import { FC } from "react";

type Props = {
  data: Array<LeaderBoardUser>;
};

export const LeagueLeaderBoard: FC<Props> = ({ data }) => {
  return (
    <Stack gap={"1.2rem"}>
      {data.map((user) => (
        <Paper
          key={user.rank}
          sx={{ p: "1.6rem", borderRadius: "2.5rem" }}
          elevation={1}
        >
          <Stack gap={"1.6rem"} alignItems={"center"} direction={"row"}>
            <Typography
              textAlign={"center"}
              sx={{ width: "4.8rem", fontSize: "2.4rem", fontWeight: 600 }}
            >
              {user.rank}
            </Typography>
            <Box sx={{ flexGrow: 1 }}>
              <Avatar
                avatarUrl={user.user.avatarUrl}
                gap={"2rem"}
                size="6.4rem"
                direction={"row"}
                label={user.user.profileName}
              />
            </Box>
            <PointsBadge />
          </Stack>
        </Paper>
      ))}
    </Stack>
  );
};
