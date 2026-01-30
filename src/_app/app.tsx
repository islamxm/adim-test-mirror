"use client";
import { FC, PropsWithChildren } from "react";

import { SessionProvider } from "next-auth/react";

import { LocaleDetector } from "@/shared/i18n/ui";
import { Toaster } from "@/shared/ui";

import { PageLoadingProgressbar } from "@/features/page-loading-progressbar";

import { AppFooter } from "@/widgets/appFooter";
import { AppHeader } from "@/widgets/appHeader";
import { MainLayout } from "@/widgets/mainLayout";

import { AnimationProvider } from "./providers/animation";
import { AuthProvider } from "./providers/auth";
import { StoreProvider, createStore } from "./providers/store";
import { StyleProvider } from "./providers/style";

export const App: FC<PropsWithChildren> = ({ children }) => {
  const store = createStore();

  return (
    <SessionProvider>
      <LocaleDetector />
      <StyleProvider>
        <PageLoadingProgressbar />
        <StoreProvider preloadedState={store}>
          <AnimationProvider animate={true}>
            <AuthProvider>
              <MainLayout
                header={(isShowHeader) => <AppHeader isShowHeader={isShowHeader} />}
                footer={<AppFooter />}
              >
                {children}
                <Toaster />
              </MainLayout>
            </AuthProvider>
          </AnimationProvider>
        </StoreProvider>
      </StyleProvider>
    </SessionProvider>
  );
};
