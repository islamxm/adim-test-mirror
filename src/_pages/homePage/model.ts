import { DefaultResponseErrorData, Response } from "@/shared/types";
import {z} from "zod";
import { PublicHomePageDataSuccessSchema } from "./contracts";

export type HomePagePublicDataResponse = Response<
  z.infer<typeof PublicHomePageDataSuccessSchema>,
  DefaultResponseErrorData
>