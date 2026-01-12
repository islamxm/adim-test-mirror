import { AuthCredentials, StreakStatus, UserStreak } from "./model";

export function getUserDeviceInfo(): Omit<AuthCredentials["deviceInfo"], "token"> {
  const userAgent = navigator.userAgent;
  const locale = navigator.language;
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const model = navigator.platform;

  return {
    web: {
      meta: {
        locale,
        model,
        timezone,
        version: "1.0.0",
      },
      userAgent,
    },
  };
}

export const getStreakStatus = (data: { day: number; streak: UserStreak }) => {
  const { day, streak } = data;
  let status: StreakStatus = "disabled";

  if (day <= streak.currentStreak) {
    status = "active";
  }
  if (day === streak.currentStreak + 1 && !streak.todayActive) {
    status = "current";
  }
  if (day > streak.currentStreak + 1 && day < 8) {
    status = "disabled";
  }
  if (day === 8) {
    status = "final";
  }
  if (day === 8 && day === streak.currentStreak + 1) {
    status = "complete";
  }

  return status;
};
