import { PropsWithChildren, ReactNode } from "react";

import { BoxProps } from "@mui/material";

export type WithUIStatuses<OtherProps extends object = object> = OtherProps & {
  isLoading?: boolean;
  isSuccess?: boolean;
  isError?: boolean;
};

export type UIStatus = "loading" | "success" | "error" | "idle";

export type UISize = "sm" | "md" | "lg" | "xlg";

export type Response<Success, Error> = {
  success: Success;
  error: Error;
};

export type DefaultResponseErrorData = {
  cause: string;
  code: number;
  message: string;
};
export type Nullable<T> = T | null;

export type ModalProps = PropsWithChildren<{
  open: boolean;
  onClose?: (...args: any[]) => any;
  title?: ReactNode;
  wrapperStyle?: BoxProps["sx"];
  contentStyle?: BoxProps["sx"];
  hideCloseButton?: boolean;
  beforeTitleSlot?: ReactNode;
}>;
