"use client";
import { FC, useState } from "react";

import { IconButton, InputAdornment, TextField, TextFieldProps, Tooltip } from "@mui/material";

import { PasswordHideIcon } from "../icons/PasswordHideIcon";

type Props = TextFieldProps & {};

export const PasswordField: FC<Props> = (props) => {
  const [isHidden, setIsHidden] = useState(true);

  return (
    <TextField
      {...props}
      type={isHidden ? "password" : "text"}
      slotProps={{
        input: {
          endAdornment: (
            <InputAdornment position={"end"}>
              <Tooltip title="Toggle password visibility">
                <IconButton onClick={() => setIsHidden((s) => !s)}>
                  <PasswordHideIcon sx={{ fontSize: "2rem" }} />
                </IconButton>
              </Tooltip>
            </InputAdornment>
          ),
        },
      }}
    />
  );
};
