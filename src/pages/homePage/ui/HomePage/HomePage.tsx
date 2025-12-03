"use client";
import { Stack } from "@mui/material";
import { HeroSection } from "../HeroSection/HeroSection";
import { CategoriesSection } from "../CategoriesSection/CategoriesSection";
import { CoursesSection } from "../CoursesSection/CoursesSection";
import { StartSection } from "../StartSection/StartSection";
import { FC } from "react";
import { HomePagePublicDataResponse } from "../../model";
import { PageEnterAnimationLayout } from "@/widgets/pageEnterAnimationLayout";
import { PromoSection } from "@/widgets/promoSection";
import { ContinueLearningSection } from "../ContinueLearningSection/ContinueLearningSection";

type Props = {
  data: HomePagePublicDataResponse["success"];
};

export const HomePage: FC<Props> = ({ data }) => {
  return (
    <PageEnterAnimationLayout>
      <Stack>
        <HeroSection />
        <ContinueLearningSection/>
        <CategoriesSection data={data.categories} />
        <PromoSection head={{title: "platform News", subtitle: "Lorem ipsum dolor sit amet consectetur. Facilisi sollicitudin tempus sit ac. Tellus ac cras in metus curabitur aliquet. "}} />
        <CoursesSection data={data.popularCourses} />
        <StartSection />
      </Stack>
    </PageEnterAnimationLayout>
  );
};
