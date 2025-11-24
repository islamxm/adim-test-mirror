import { AuthCredentials } from "./model";
export function getUserDeviceInfo():Omit<AuthCredentials, "token"> {
  const userAgent = navigator.userAgent;
  const locale = navigator.language;
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone
  const model = navigator.platform;

  return {
    deviceInfo: {
      web: {
        meta: {
          locale,
          model,
          timezone,
          version: "1.0.0"
        },
        userAgent
      }
    }
  }
}