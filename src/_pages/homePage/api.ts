import { api } from "@/shared/api";

import { PublicHomePageDataDtoSchema } from "./contracts";
import { publicHomePageDataDtoMap } from "./lib";

export const homePageApi = api.injectEndpoints({
  endpoints: (build) => ({
    getHomePublicData: build.query({
      query: () => ({
        url: "/home/public?lang=tk",
        cache: "force-cache",
        next: {
          revalidate: 60, // Кэшировать на 1 минут (в секундах)
          tags: ["home-data"], // Тег для принудительной инвалидации
        },
      }),
      transformResponse: (res: any) => {
        try {
          const validated = PublicHomePageDataDtoSchema.parse(res);
          return publicHomePageDataDtoMap(validated);
        } catch (err) {
          console.error("INVALID RESPONSE:", err);
        }
      },
    }),
  }),
});
