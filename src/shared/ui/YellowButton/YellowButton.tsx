import { FC, HTMLProps } from "react";

import { ButtonProps } from "@mui/material";
import { CircularProgress } from "@mui/material";
import clsx from "clsx";

import classes from "./classes.module.scss";

type PropsFromMuiButton = Pick<ButtonProps, "endIcon" | "startIcon" | "fullWidth">;

type Props = HTMLProps<HTMLButtonElement> &
  PropsFromMuiButton & {
    type?: "submit" | "reset" | "button";
    loading?: boolean;
  };

export const YellowButton: FC<Props> = ({
  children,
  endIcon,
  startIcon,
  fullWidth,
  type = "button",
  loading,
  ...restProps
}) => {
  return (
    <button
      {...restProps}
      className={clsx(
        restProps.className,
        classes.wrapper,
        fullWidth && classes.fill,
        loading && classes.loading,
      )}
    >
      <div className={classes.main}>
        {loading && (
          <div className={classes.loader}>
            <CircularProgress sx={{ color: "#fff" }} size={"3rem"} />
          </div>
        )}
        {startIcon && <span className={clsx(classes.icon, classes.start)}>{startIcon}</span>}
        {children && <span className={classes.content}>{children}</span>}
        {endIcon && <span className={clsx(classes.icon, classes.end)}>{endIcon}</span>}
      </div>
    </button>
  );
};
