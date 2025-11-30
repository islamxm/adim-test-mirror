"use client";
import { FC, PropsWithChildren } from "react";
import { StyleProvider } from "./providers/style";
import { createStore, StoreProvider } from "./providers/store";
// import { AnimationProvider } from "./providers/animation";
import { SessionProvider } from "next-auth/react";
import { MainLayout } from "@/widgets/mainLayout";
import { AppHeader } from "@/widgets/appHeader";
import { AppFooter } from "@/widgets/appFooter";

export const App: FC<PropsWithChildren> = ({ children }) => {
  const store = createStore();

  return (
    <SessionProvider>
      <StyleProvider>
        <StoreProvider preloadedState={store}>
          <MainLayout footer={<AppFooter/>} header={<AppHeader/>}>
            {children}
          </MainLayout>
        </StoreProvider>
      </StyleProvider>
    </SessionProvider>
  );
};
