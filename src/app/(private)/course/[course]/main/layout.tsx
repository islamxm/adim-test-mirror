"use client";
import { ReactNode } from "react";

import { PageEnterAnimationLayout } from "@/widgets/pageEnterAnimationLayout";

import { CoursePageLayout } from "@/_pages/coursePage";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <PageEnterAnimationLayout>
      <CoursePageLayout>{children}</CoursePageLayout>
    </PageEnterAnimationLayout>
  );
}
