import { FC, PropsWithChildren } from "react";
import { AnimationContext, InitStateType } from "../config";

type Props = PropsWithChildren<InitStateType>;

export const AnimationProvider: FC<Props> = ({ children, animate }) => {
  return (
    <AnimationContext.Provider value={{ animate }}>
      {children}
    </AnimationContext.Provider>
  );
};
