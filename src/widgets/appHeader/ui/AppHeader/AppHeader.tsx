"use client";
import { Box } from "@mui/material";
import { Navbar } from "../Navbar/Navbar";
import { StreakBadge } from "@/entities/user";
import { LeagueBadge } from "@/entities/league";
import classes from "./classes.module.scss";
import { useAuth } from "@/shared/lib/useAuth";

export const AppHeader = () => {
  const isAuth = useAuth();
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
            <StreakBadge />
          </div>
          <div className={classes.right}>
            <LeagueBadge />
          </div>
        </>
      )}
    </Box>
  );
};
