import { FC } from "react";

import { Button, ButtonProps } from "@mui/material";

import { cn } from "@/shared/lib";

import classes from "./classes.module.scss";

export const GlowingButton: FC<ButtonProps> = ({ children, ...props }) => {
  return (
    <Button
      {...props}
      sx={(theme) => ({
        boxShadow:
          "6px 0px 8px 0px rgba(255, 0, 0, 0.25), 0px 6px 8px 0px rgba(0, 255, 38, 0.25), 0px -6px 8px 0px rgba(43, 6, 255, 0.25),-6px 0px 8px 0px rgba(0, 222, 178, 0.25)",
        "&:hover": {
          boxShadow:
            "15px 0px 15px 0px rgba(255, 0, 0, 0.25), 0px 15px 15px 0px rgba(0, 255, 38, 0.25), 0px -15px 15px 0px rgba(43, 6, 255, 0.25),-15px 0px 15px 0px rgba(0, 222, 178, 0.25)",
        },
        // "&::after": {
        //   backgroundColor: theme.palette.primary.main,
        // },
      })}
    >
      <div className={classes.content}>{children}</div>
    </Button>
  );
};
