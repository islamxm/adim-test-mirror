"use client";
import { useEffect } from "react";

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
import { RatingTopThreeEmpty } from "../RatingTopThree/RatingTopThree.empty";
import { RatingTopThreeSkeleton } from "../RatingTopThree/RatingTopThree.skeleton";
import { SelectLeague } from "../SelectLeague/SelectLeague";

export const RatingPage = () => {
  const { data: userData } = userApi.useGetUserProfileQuery({});
  const pathname = usePathname();
  const activeLeague = useSearchParams().get("league") as League;

  const {
    data: rawData,
    isLoading,
    isError,
    isSuccess,
    isFetching,
    hasNextPage,
    fetchNextPage,
  } = leagueApi.useGetLeaderboardInfiniteQuery(
    { cursor: 0, leagueName: activeLeague },
    { skip: !activeLeague },
  );

  const data = rawData?.pages.length ? rawData.pages.map((f) => f.board).flat() : [];
  const topThree = data.filter((d) => d.rank <= 3) || [];

  const onLeagueChange = (e: League | null) => {
    const url = `${pathname}?league=${e}`;
    window.history.replaceState(null, "", url);
  };

  useEffect(() => {
    if (userData && !activeLeague) {
      if (userData?.leagueName) {
        onLeagueChange(userData.leagueName as League);
      } else {
        onLeagueChange("BRONZE");
      }
    }
  }, [userData, activeLeague]);

  return (
    <PageEnterAnimationLayout>
      <Stack sx={{ height: "100%", pt: "13.8rem" }} gap={"9.6rem"} alignItems={"center"}>
        <SelectLeague activeLeague={activeLeague} onChange={onLeagueChange} />
        {isFetching && <RatingTopThreeSkeleton />}
        {!isFetching && topThree.length > 0 && <RatingTopThree data={topThree} />}
        {!isFetching && topThree.length === 0 && <RatingTopThreeEmpty />}
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
                {!data.find((d) => d.user.id === userData?.id) &&
                  userData &&
                  userData?.leagueName === activeLeague && (
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
