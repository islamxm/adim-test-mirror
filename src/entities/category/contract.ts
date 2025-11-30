import { z } from "zod";

export const CategorySchema = z.object({
  iconPath: z.string(),
  id: z.number(),
  name: z.string(),
});
