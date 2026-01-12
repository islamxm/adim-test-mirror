import { z } from "zod";

export const UserSchema = z.object({
  avatarUrl: z.string(),
  backupEmail: z.email().optional(),
  birthday: z.string().optional(),
  email: z.email(),
  phone: z.string().optional(),
  id: z.number(),
  profileName: z.string(),
  username: z.string(),
  totalPoints: z.number(),
  leagueName: z.string(),
  rank: z.number().optional(),
});

export const Response_AuthSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string(),
  deviceId: z.string(),
  locale: z.string(),
});

export const Response_GoogleAuthSchema = z.object({
  accessToken: z.string(),
  deviceId: z.string(),
  refreshToken: z.string(),
  userId: z.number(),
});

export const Response_UserHomeDataSchema = z.object({
  continueLearning: z.array(
    z.object({
      courseIcon: z.string(),
      courseId: z.number(),
      courseName: z.string(),
      percent: z.number(),
    })
  ),
  userStreak: z.object({
    currentStreak: z.number(),
    daysForPoint: z.number(),
    pointsFromStreak: z.number(),
    todayActive: z.boolean(),
  }),
});

export const Payload_AuthSchema = z.object({
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
