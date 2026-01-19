"use client";
import { usePathname, useSearchParams } from "next/navigation";

import { Stack, Typography } from "@mui/material";

import { Container } from "@/shared/ui/Container";

import { League, leagueApi } from "@/entities/league";
import { userApi } from "@/entities/user";

import { PageEnterAnimationLayout } from "@/widgets/pageEnterAnimationLayout";
import { ResourceList } from "@/widgets/resourceList";

import { RatingProfileItem } from "../RatingProfileItem/RatingProfileItem";
import { RatingProfileItemSkeleton } from "../RatingProfileItem/RatingProfileItem.skeleton";
import { RatingTopThree } from "../RatingTopThree/RatingTopThree";
import { SelectLeague } from "../SelectLeague/SelectLeague";

export const RatingPage = () => {
  const { data: userData } = userApi.useGetUserProfileQuery({});
  const pathname = usePathname();
  const activeLeague = (useSearchParams().get("league") as League) || "BRONZE";
  const {
    data: rawData,
    isLoading,
    isError,
    isSuccess,
    hasNextPage,
    fetchNextPage,
  } = leagueApi.useGetLeaderboardInfiniteQuery(
    { cursor: 0, leagueName: activeLeague },
    { skip: !activeLeague },
  );

  const data = rawData?.pages.length ? rawData.pages.map((f) => f.board).flat() : [];
  const topThree = data.filter((d) => d.rank <= 3) || [];

  const onLeagueChange = (e: any) => {
    const url = `${pathname}?league=${e}`;
    window.history.replaceState(null, "", url);
  };

  return (
    <PageEnterAnimationLayout>
      <Stack sx={{ height: "100%", pt: "13.8rem" }} gap={"9.6rem"} alignItems={"center"}>
        <SelectLeague activeLeague={activeLeague} onChange={onLeagueChange} />
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
                  component: RatingProfileItemSkeleton,
                }}
              >
                {data
                  .filter((d) => d.rank > 3)
                  .map((profile) => (
                    <RatingProfileItem
                      key={profile.rank}
                      data={profile}
                      isActive={userData?.id === profile.user.id}
                    />
                  ))}
                {!data.find((d) => d.user.id === userData?.id) && userData && (
                  <RatingProfileItem
                    isActive
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
