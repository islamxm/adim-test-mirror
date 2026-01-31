import { FC } from "react";

import { Box, Button, ButtonProps } from "@mui/material";
import clsx from "clsx";

import classes from "./classes.module.scss";

const defaultSx: ButtonProps["sx"] = {
  borderRadius: "3rem",
};

export const GlowingButton: FC<ButtonProps> = ({ children, ...props }) => {
  const sx: ButtonProps["sx"] = {
    ...defaultSx,
    ...props.sx,
  };

  return (
    <div className={clsx(classes.wrapper, props.fullWidth && classes.full_width)}>
      <Button
        {...props}
        variant={"contained"}
        className={clsx(props.className, classes.button)}
        sx={sx}
      >
        <div className={classes.content}>{children}</div>
      </Button>
      <Box sx={sx} className={classes.mask}></Box>
      <div className={classes.shadow}></div>
    </div>
  );
};
