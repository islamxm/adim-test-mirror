import { FC, HTMLProps } from "react";

import { ButtonProps } from "@mui/material";
import clsx from "clsx";

import classes from "./classes.module.scss";

type PropsFromMuiButton = Pick<ButtonProps, "endIcon" | "startIcon" | "fullWidth">;

type Props = HTMLProps<HTMLButtonElement> &
  PropsFromMuiButton & {
    type?: "submit" | "reset" | "button";
  };

export const YellowButton: FC<Props> = ({
  children,
  endIcon,
  startIcon,
  fullWidth,
  type = "button",
  ...restProps
}) => {
  return (
    <button
      {...restProps}
      className={clsx(restProps.className, classes.wrapper, fullWidth && classes.fill)}
    >
      <div className={classes.main}>
        {startIcon && <span className={clsx(classes.icon, classes.start)}>{startIcon}</span>}
        {children && <span className={classes.content}>{children}</span>}
        {endIcon && <span className={clsx(classes.icon, classes.end)}>{endIcon}</span>}
      </div>
    </button>
  );
};
