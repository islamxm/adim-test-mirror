"use client";
import { Box, Grid, Stack } from "@mui/material";

import { LogoutPanel } from "@/features/auth/logout";
import { FeedbackPanel } from "@/features/feedback";
import { DevicesPanel } from "@/features/manage-devices";

import { PageEnterAnimationLayout } from "@/widgets/pageEnterAnimationLayout";

import { BuySubscriptionButton } from "../BuySubscriptionButton/BuySubscriptionButton";
import { FinishedCourses } from "../FinishedCourses/FinishedCourses";
import { Month } from "../Month/Month";
import { Points } from "../Points/Points";
import { PricesPanel } from "../PricesPanel/PricesPanel";
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
            bottom={
              <>
                <Box sx={{ gridColumn: 1, width: "100%" }}>
                  <DevicesPanel />
                </Box>
                <Box sx={{ gridColumn: 2, width: "100%" }}>
                  <PricesPanel />
                </Box>
                <Box sx={{ gridColumn: 1, width: "100%" }}>
                  <FeedbackPanel />
                </Box>
                <Box sx={{ gridColumn: 2, width: "100%" }}>
                  <LogoutPanel />
                </Box>
              </>
            }
          />
          {/* <FinishedCourses /> */}
        </ProfileBody>
      </Stack>
    </PageEnterAnimationLayout>
  );
};
