import { z } from "zod";
import { CategorySchema } from "./contract";

export type CategoryDto = z.infer<typeof CategorySchema>;
export type Category = CategoryDto;
