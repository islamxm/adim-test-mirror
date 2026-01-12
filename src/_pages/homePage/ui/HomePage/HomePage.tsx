"use client";
import { FC } from "react";

import { Stack } from "@mui/material";

import { PageEnterAnimationLayout } from "@/widgets/pageEnterAnimationLayout";
import { PromoSection } from "@/widgets/promoSection";

import { PublicHomePageData } from "../../model";
import { CategoriesSection } from "../CategoriesSection/CategoriesSection";
import { ContinueLearningSection } from "../ContinueLearningSection/ContinueLearningSection";
import { CoursesSection } from "../CoursesSection/CoursesSection";
import { HeroSection } from "../HeroSection/HeroSection";
import { StartSection } from "../StartSection/StartSection";

type Props = {
  data: PublicHomePageData;
};

export const HomePage: FC<Props> = ({ data }) => {
  return (
    <PageEnterAnimationLayout>
      <Stack>
        <HeroSection />
        <ContinueLearningSection />
        <CategoriesSection data={data.categories} />
        <PromoSection
          bgcolor={(theme) => theme.palette.background.default}
          head={{
            title: "platform News",
            subtitle:
              "Lorem ipsum dolor sit amet consectetur. Facilisi sollicitudin tempus sit ac. Tellus ac cras in metus curabitur aliquet. ",
          }}
        />
        <CoursesSection data={data.popularCourses} />
        <StartSection />
      </Stack>
    </PageEnterAnimationLayout>
  );
};
