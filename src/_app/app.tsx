"use client";
import { FC, PropsWithChildren } from "react";
import { StyleProvider } from "./providers/style";
import { createStore, StoreProvider } from "./providers/store";
import { SessionProvider } from "next-auth/react";
import { AuthProvider } from "./providers/auth";
import { MainLayout } from "@/widgets/mainLayout";
import { AppHeader } from "@/widgets/appHeader";
import { AppFooter } from "@/widgets/appFooter";
import { AnimationProvider } from "./providers/animation";
import { ToastContainer } from "react-toastify";
import { LocaleDetector } from "@/shared/i18n/ui";

export const App: FC<PropsWithChildren> = ({ children }) => {
  const store = createStore();

  return (
    <SessionProvider>
      <LocaleDetector/>
      <StyleProvider>
        <StoreProvider preloadedState={store}>
          <AnimationProvider animate={true}>
            <AuthProvider>
              <MainLayout header={<AppHeader />} footer={<AppFooter />}>
                {children}
                <ToastContainer
                  // hideProgressBar
                  position={"bottom-right"}
                />
              </MainLayout>
            </AuthProvider>
          </AnimationProvider>
        </StoreProvider>
      </StyleProvider>
    </SessionProvider>
  );
};
