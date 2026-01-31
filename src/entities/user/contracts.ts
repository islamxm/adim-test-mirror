import { z } from "zod";

export const DeviceInfoSchema = z.object({
  web: z.object({
    meta: z.object({
      locale: z.string(),
      model: z.string(),
      timezone: z.string(),
      version: z.string(),
    }),
    userAgent: z.string(),
  }),
});

export const UserSchema = z.object({
  avatarUrl: z.string(),
  backupEmail: z.email().optional(),
  email: z.string().or(z.email()),
  phone: z.string().optional(),
  id: z.number(),
  profileName: z.string(),
  username: z.string(),
  totalPoints: z.number(),
  leagueName: z.string().nullable(),
  rank: z.number().optional(),
  subscriptionExpiresAt: z.string().optional(),
  month: z.string().optional(),
  firstCalendarDay: z.number().optional(),
  birthday: z.string().optional(),
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
    }),
  ),
  userStreak: z.object({
    currentStreak: z.number(),
    daysForPoint: z.number(),
    pointsFromStreak: z.number(),
    todayActive: z.boolean(),
  }),
});

export const Response_MonthlyStreakSchema = z.object({
  firstCalendarDay: z.number(),
  mask: z.number(),
  month: z.string(),
});

export const Payload_AuthSchema = z.object({
  token: z.string(),
  deviceInfo: DeviceInfoSchema,
});
export const Payload_RegisterSchema = z.object({
  deviceInfo: DeviceInfoSchema,
  email: z.string(),
  profileName: z.string(),
  password: z.string(),
});
export const Payload_LoginSchema = z.object({
  deviceInfo: DeviceInfoSchema,
  email: z.string(),
  password: z.string(),
});
export const Payload_VerifySchema = z.object({
  token: z.string(),
});

export const Response_RegisterSchema = z.any();
