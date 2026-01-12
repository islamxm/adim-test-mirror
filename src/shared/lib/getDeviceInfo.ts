import { DeviceInfo } from "../model";

export function getDeviceInfo(): DeviceInfo {
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
