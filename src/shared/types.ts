export type WithUIStatuses<OtherProps extends object = object> = OtherProps & {
  isLoading?: boolean;
  isSuccess?: boolean;
  isError?: boolean;
}

export type UIStatus = "loading" | "success" | "error" | "idle";

export type Response<Success, Error> = {
  success: Success,
  error: Error
}

export type DefaultResponseErrorData = {
  cause: string,
  code: number,
  message: string
}