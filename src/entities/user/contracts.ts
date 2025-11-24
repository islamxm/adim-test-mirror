import { z } from "zod";

export const AuthCredentialsSchema = z.object({
  token: z.string(),
  deviceInfo: z.object({
    web: z.object({
      meta: z.object({
        locale: z.string(),
        model: z.string(),
        timezone: z.string(),
        version: z.string(),
      }),
      userAgent: z.string(),
    }),
  }),
});

export const AuthSuccessResponseSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string(),
  deviceId: z.string(),
  locale: z.string(),
});

export const AuthSuccessGoogleResponseSchema = z.object({
  accessToken: z.string(),
  deviceId: z.string(),
  refreshToken: z.string(),
  userId: z.number(),
});
