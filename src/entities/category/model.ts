import { z } from "zod";
import { CategorySchema, Response_GetCategoriesSchema } from "./contracts";

export type CategoryDto = z.infer<typeof CategorySchema>;
export type Category = CategoryDto;

export type Response_GetCategories = z.infer<
  typeof Response_GetCategoriesSchema
>;
