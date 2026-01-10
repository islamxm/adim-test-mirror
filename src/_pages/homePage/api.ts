import { api } from "@/shared/api";
import { PublicHomePageDataDtoSchema } from "./contracts";
import { publicHomePageDataDtoMap } from "./lib";

export const homePageApi = api.injectEndpoints({
  endpoints: (build) => ({
    getHomePublicData: build.query({
      query: () => ({
        url: "/home/public?lang=tk",
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
