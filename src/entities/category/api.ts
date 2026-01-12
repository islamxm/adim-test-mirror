import { api } from "@/shared/api";

import { Response_GetCategoriesSchema } from "./contracts";

export const categoryApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: () => ({
        url: "/home/categories",
      }),
      transformResponse: (res) => {
        try {
          return Response_GetCategoriesSchema.parse(res);
        } catch (err) {
          console.log("VALIDATE ERROR", err);
        }
      },
    }),
  }),
});
