import { z } from "zod";
import { CategorySchema } from "./contracts";

export type CategoryDto = z.infer<typeof CategorySchema>;
export type Category = CategoryDto;
