"use client";
import { Stack, Typography } from "@mui/material";
import { LeagueTopThree } from "@/features/league/league-top-three";
import { LeagueRatingTabs } from "@/features/league/select-league-rating";
import { LeagueLeaderBoard } from "@/features/league/league-leader-board";
import { Container } from "@/shared/ui/Container";
import { PageEnterAnimationLayout } from "@/widgets/pageEnterAnimationLayout";

export const RatingPage = () => {
  return (
    <PageEnterAnimationLayout>
      <Stack
        sx={{ height: "100%", pt: "13.8rem" }}
        gap={"9.6rem"}
        alignItems={"center"}
      >
        <Stack alignItems={"center"} gap={"6.4rem"}>
          <LeagueRatingTabs />
          <LeagueTopThree />
        </Stack>
        <Stack
          gap={"2.4rem"}
          sx={(theme) => ({
            backgroundColor: theme.palette.common.white,
            width: "100%",
            py: "2.4rem",
            flexGrow: 1,
          })}
        >
          <Container>
            <Stack gap={"2.4rem"}>
              <Typography variant="h2">Leaderboard</Typography>
              <LeagueLeaderBoard />
            </Stack>
          </Container>
        </Stack>
      </Stack>
    </PageEnterAnimationLayout>
  );
};
