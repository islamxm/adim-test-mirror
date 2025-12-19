"use client";
import { PageEnterAnimationLayout } from "@/widgets/pageEnterAnimationLayout";
import { ReactNode } from "react";
import { CoursePageLayout } from "@/_pages/coursePage";

export default function Layout({ children }: { children: ReactNode }) {

  return (
    <PageEnterAnimationLayout>
      <CoursePageLayout>{children}</CoursePageLayout>
    </PageEnterAnimationLayout>
  );
}
