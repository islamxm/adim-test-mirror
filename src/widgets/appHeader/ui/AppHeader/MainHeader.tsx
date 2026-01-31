import { AnimatePresence } from "motion/react";

import { useSelector } from "@/shared/lib";

import { StreakInfo } from "@/features/user/streak-info";
import { UserAvatar } from "@/features/user/user-avatar";

import { Navbar } from "../Navbar/Navbar";
import { RightSide } from "../RightSide/RightSide";
import classes from "./classes.module.scss";

export const MainHeader = () => {
  const { isAuth } = useSelector((s) => s.user);

  return (
    <>
      <Navbar
        endSlot={<AnimatePresence>{isAuth && <UserAvatar />}</AnimatePresence>}
        sx={{
          gridArea: "main",
          position: "relative",
          zIndex: 2,
        }}
      />
      <AnimatePresence>
        {/* <div key={"header-left-side"} className={classes.left}>
          <StreakInfo />
        </div> */}
        <div key={"header-right-side"} className={classes.right}>
          <RightSide />
        </div>
      </AnimatePresence>
    </>
  );
};
