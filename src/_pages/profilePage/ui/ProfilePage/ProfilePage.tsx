"use client";
import { Grid, Stack } from "@mui/material";

import { LogoutPanel } from "@/features/auth/logout";

import { PageEnterAnimationLayout } from "@/widgets/pageEnterAnimationLayout";

import { BuySubscriptionButton } from "../BuySubscriptionButton/BuySubscriptionButton";
import { FinishedCourses } from "../FinishedCourses/FinishedCourses";
import { Month } from "../Month/Month";
import { Points } from "../Points/Points";
import { ProfileBody } from "../ProfileBody/ProfileBody";
import { ProfileDetailsLayout } from "../ProfileDetailsLayout/ProfileDetailsLayout";
import { ProfileHeader } from "../ProfileHeader/ProfileHeader";
import { Streak } from "../Streak/Streak";

export const ProfilePage = () => {
  return (
    <PageEnterAnimationLayout>
      <Stack sx={{ height: "100%", pt: "9.8rem" }}>
        <ProfileHeader />
        <ProfileBody>
          <BuySubscriptionButton />
          <ProfileDetailsLayout
            leftTop={<Streak />}
            leftBottom={<Points />}
            right={<Month />}
            // bottom={
            //   <>
            //     <Grid size={12}>
            //       <LogoutPanel />
            //     </Grid>
            //   </>
            // }
          />
          {/* <FinishedCourses /> */}
        </ProfileBody>
      </Stack>
    </PageEnterAnimationLayout>
  );
};
