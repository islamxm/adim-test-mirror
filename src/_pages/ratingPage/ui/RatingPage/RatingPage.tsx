"use client";
import { Stack, Typography } from "@mui/material";
import { RatingTopThree } from "../RatingTopThree/RatingTopThree";
import { Container } from "@/shared/ui/Container";
import { PageEnterAnimationLayout } from "@/widgets/pageEnterAnimationLayout";
import { League, leagueApi } from "@/entities/league";
import { userApi } from "@/entities/user";
import { ResourceList } from "@/widgets/resourceList";
import { RatingProfileItem } from "../RatingProfileItem/RatingProfileItem";
import { RatingProfileItemSkeleton } from "../RatingProfileItem/RatingProfileItem.skeleton";
import { UserCurrentLeague } from "../UserCurrentLeague/UserCurrentLeague";

export const RatingPage = () => {
  const { data: userData } = userApi.useGetUserProfileQuery({});
  const {
    data: rawData,
    isLoading,
    isError,
    isSuccess,
    hasNextPage,
    fetchNextPage,
  } = leagueApi.useGetLeaderboardInfiniteQuery({ cursor: 0 });

  const data = rawData?.pages.length
    ? rawData.pages.map((f) => f.board).flat()
    : [];
  const topThree = data.filter((d) => d.rank <= 3) || [];

  return (
    <PageEnterAnimationLayout>
      <Stack
        sx={{ height: "100%", pt: "13.8rem" }}
        gap={"9.6rem"}
        alignItems={"center"}
      >
        <UserCurrentLeague leagueName={userData?.leagueName as League} />
        <RatingTopThree data={topThree} />
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
              <ResourceList
                isError={isError}
                isLoading={isLoading}
                isSuccess={isSuccess}
                canLoadMore={hasNextPage}
                onLoadMore={fetchNextPage}
                skeleton={{
                  count: 5,
                  component: <RatingProfileItemSkeleton />,
                }}
              >
                {data
                  .filter((d) => d.rank > 3)
                  .map((profile) => (
                    <RatingProfileItem
                      data={profile}
                      isActive={userData?.id === profile.user.id}
                      key={profile.user.id}
                    />
                  ))}
                {!data.find((d) => d.user.id === userData?.id) && userData && (
                  <RatingProfileItem
                    data={{
                      points: userData.totalPoints,
                      rank: userData.rank || 0,
                      user: userData,
                    }}
                  />
                )}
              </ResourceList>
            </Stack>
          </Container>
        </Stack>
      </Stack>
    </PageEnterAnimationLayout>
  );
};
