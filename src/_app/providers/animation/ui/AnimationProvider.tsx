import { FC, PropsWithChildren } from "react";
import { AnimationContext, InitStateType } from "../config";
import { Anim_ScreenFillingCircle } from "@/animations/screen-filling-circle";
type Props = PropsWithChildren<InitStateType>;

export const AnimationProvider: FC<Props> = ({ children, animate }) => {
  return (
    <AnimationContext.Provider value={{ animate }}>
      <Anim_ScreenFillingCircle/>
      {children}
    </AnimationContext.Provider>
  );
};
