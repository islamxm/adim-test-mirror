import { Navbar } from "../Navbar/Navbar";
import classes from "./classes.module.scss";
import { StreakInfo } from "@/features/user/streak-info";
import { useSelector } from "@/shared/lib";
import { AnimatePresence } from "motion/react";
import { UserAvatar } from "@/features/user/user-avatar";
import { RightSide } from "../RightSide/RightSide";

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
        <div className={classes.left}>
          <StreakInfo />
        </div>
        <div className={classes.right} style={{ width: "100%" }}>
          <RightSide />
        </div>
      </AnimatePresence>
    </>
  );
};
