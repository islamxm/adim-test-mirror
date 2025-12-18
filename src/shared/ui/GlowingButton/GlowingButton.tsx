import { FC } from "react";
import classes from "./classes.module.scss";
import { Button, ButtonProps } from "@mui/material";
import { cn } from "@/shared/lib";

export const GlowingButton: FC<ButtonProps> = ({ children, ...props }) => {
  return (
    <Button
      {...props}
      className={cn([classes.button, props.className])}
      sx={theme => ({
        "&::after": {
          backgroundColor: theme.palette.primary.main
        }
      })}
    >
      <div className={classes.content}>{children}</div>
    </Button>
  );
};
