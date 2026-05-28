import { Prisma, CollegeType } from "@prisma/client";
import { CollegeQueryParams } from "../schema/college-query.schema";

/**
 * Reusable utility to build Prisma where clause for colleges
 */
export function buildCollegeWhereClause(params: Partial<CollegeQueryParams>): Prisma.CollegeWhereInput {
  const { search, city, state, type } = params;

  const where: Prisma.CollegeWhereInput = {
    AND: [],
  };

  const andArray = where.AND as Prisma.CollegeWhereInput[];

  if (search) {
    andArray.push({
      OR: [
        { name: { contains: search, mode: "insensitive" } },
        { city: { contains: search, mode: "insensitive" } },
        { state: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
      ],
    });
  }

  if (city) {
    andArray.push({ city: { equals: city, mode: "insensitive" } });
  }

  if (state) {
    andArray.push({ state: { equals: state, mode: "insensitive" } });
  }

  if (type) {
    andArray.push({ type });
  }

  return where;
}

/**
 * Reusable utility to build pagination metadata
 */
export function buildPaginationMeta(total: number, page: number, limit: number) {
  return {
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
  };
}
