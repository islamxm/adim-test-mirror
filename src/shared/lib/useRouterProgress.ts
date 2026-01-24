"use client";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useRouter } from "next/navigation";

import nProgress from "nprogress";

export const useRouterProgress = () => {
  const router = useRouter();

  const push: AppRouterInstance["push"] = (...args) => {
    nProgress.start();
    router.push(...args);
  };

  const replace: AppRouterInstance["replace"] = (...args) => {
    nProgress.start();
    router.replace(...args);
  };

  return {
    ...router,
    replace,
    push,
  };
};
