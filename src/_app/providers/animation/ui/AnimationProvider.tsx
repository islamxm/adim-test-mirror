import { FC, PropsWithChildren } from "react";

import { Anim_ScreenFillingCircle } from "@/animations/screen-filling-circle";

import { AnimationContext, InitStateType } from "../config";

type Props = PropsWithChildren<InitStateType>;

export const AnimationProvider: FC<Props> = ({ children, animate }) => {
  return (
    <AnimationContext.Provider value={{ animate }}>
      <Anim_ScreenFillingCircle />
      {children}
    </AnimationContext.Provider>
  );
};
