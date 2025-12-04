"use client";
import { Box } from "@mui/material";
import { Navbar } from "../Navbar/Navbar";
import classes from "./classes.module.scss";
import { StreakInfo } from "@/features/user/streak-info";
import { useSelector } from "@/shared/lib";


export const AppHeader = () => {
  const {isAuth} = useSelector(s => s.user)

  return (
    <Box
      sx={{
        p: "4rem 3rem",
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        alignItems: "center",
        zIndex: 10,
      }}
      className={classes.wrapper}
    >
      <div className={classes.main}>
        <Navbar />
      </div>
      {isAuth && (
        <>
          <div className={classes.left}>
            <StreakInfo/>
          </div>
          {/* <div className={classes.right}>            
          </div> */}
        </>
      )}
    </Box>
  );
};
