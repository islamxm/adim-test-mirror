"use client";
import { FC, PropsWithChildren } from "react";
import { StyleProvider } from "./providers/style";
import { createStore, StoreProvider } from "./providers/store";
import { SessionProvider } from "next-auth/react";
// import { AnimationProvider } from "./providers/animation";

export const App: FC<PropsWithChildren> = ({ children }) => {
  const store = createStore();

  return (
    <SessionProvider>
      <StyleProvider>
        <StoreProvider preloadedState={store}>{children}</StoreProvider>
      </StyleProvider>
    </SessionProvider>
  );
};
