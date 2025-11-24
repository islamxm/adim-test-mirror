import { z } from "zod";
import { DefaultResponseErrorData, Response } from "@/shared/types";
import { AuthCredentialsSchema, AuthSuccessGoogleResponseSchema, AuthSuccessResponseSchema } from "./contracts";

export type AuthType = "login" | "register" | "verify";
export type AuthCredentials = z.infer<typeof AuthCredentialsSchema>;
export type AuthResponse = Response<
  z.infer<typeof AuthSuccessResponseSchema>,
  DefaultResponseErrorData
>;
export type AuthGoogleResponse = Response<
  z.infer<typeof AuthSuccessGoogleResponseSchema>,
  DefaultResponseErrorData
>
