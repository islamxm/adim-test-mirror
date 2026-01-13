import { api } from "@/shared/api";

import { Payload_Register } from "@/entities/user";

export const registerApi = api.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (body: Payload_Register) => ({
        url: "users/register",
        body: JSON.stringify(body),
        method: "POST",
      }),
    }),
  }),
});
