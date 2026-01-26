import { FC } from "react";

import { Button, ButtonProps } from "@mui/material";
import clsx from "clsx";

import classes from "./classes.module.scss";

export const GlowingButton: FC<ButtonProps> = ({ children, ...props }) => {
  return (
    <div className={classes.wrapper}>
      <Button {...props} className={clsx(props.className, classes.button)}>
        <div className={classes.content}>{children}</div>
      </Button>
      <div className={classes.mask}></div>
      <div className={classes.shadow}></div>
    </div>
  );
};
