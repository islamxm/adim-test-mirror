import { authConfig } from "@/entities/user";

export const runtime = "nodejs";

export const { GET, POST } = authConfig.handlers;
