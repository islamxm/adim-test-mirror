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

export const App: FC<PropsWithChildren> = ({ children }) => {
  const store = createStore();

  return (
    <SessionProvider>
      <StyleProvider>
        <StoreProvider preloadedState={store}>
          <AnimationProvider animate={true}>
            <AuthProvider>
              <MainLayout header={<AppHeader />} footer={<AppFooter />}>
                {children}
              </MainLayout>
            </AuthProvider>
          </AnimationProvider>
        </StoreProvider>
      </StyleProvider>
    </SessionProvider>
  );
};
