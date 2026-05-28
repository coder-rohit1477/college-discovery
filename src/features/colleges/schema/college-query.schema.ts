import { z } from "zod";
import { CollegeType } from "@prisma/client";

export const collegeQuerySchema = z.object({
  search: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  type: z.nativeEnum(CollegeType).optional(),
  minRating: z.coerce.number().min(0).max(5).optional(),
  sortBy: z.enum(["rating", "fees", "ranking", "createdAt"]).default("ranking"),
  sortOrder: z.enum(["asc", "desc"]).default("asc"),
  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().min(1).max(100).default(10),
});

export type CollegeQueryParams = z.infer<typeof collegeQuerySchema>;
