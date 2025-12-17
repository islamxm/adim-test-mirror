export type Route = {
  id: number;
  path: string;
  label: string;
};
export type WsState = "CONNECTING" | "OPEN" | "CLOSING" | "CLOSED";

export const getHomePage = () => "/home";
export const getCoursesPage = () => "/courses";
export const getPointsPage = () => "/points";
export const getRatingPage = () => "/rating";
export const getCoursePage = (courseId: number) => `/course/${courseId}`
export const getAboutCoursePage = (courseId: number) => `${getCoursePage(courseId)}/about`

export const routesMap = {
  home: { id: 1, path: getHomePage(), label: "Home" },
  courses: { id: 2, path: getCoursesPage(), label: "Courses" },
  points: { id: 3, path: getPointsPage(), label: "Points" },
  rating: { id: 4, path: getRatingPage(), label: "Rating" },
};

export const routes = Object.entries(routesMap).map((route) => route[1]);

export type DeviceInfo = {
  web: {
    meta: {
      locale: string;
      model: string;
      timezone: string;
      version: string;
    };
    userAgent: string;
  };
};

export const languagesMap = {
  ["tk"]: { label: "Türkmençe" },
  ["ru"]: { label: "Русский" }
};
export type Language = keyof typeof languagesMap;
