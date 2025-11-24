"use client";
import { FC, PropsWithChildren } from "react";
import { StyleProvider } from "./providers/style";
import { createStore, StoreProvider } from "./providers/store";
import { AnimationProvider } from "./providers/animation";
import { SessionProvider } from "next-auth/react";
export const App: FC<PropsWithChildren> = ({ children }) => {
  const store = createStore();

  return (
    <SessionProvider>
      <StyleProvider>
        <StoreProvider preloadedState={store}>
          <AnimationProvider animate={true}>{children}</AnimationProvider>
        </StoreProvider>
      </StyleProvider>
    </SessionProvider>
  );
};
