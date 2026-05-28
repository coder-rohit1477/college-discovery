import prisma from "@/lib/prisma";
import { CollegeQueryParams } from "../schema/college-query.schema";
import { Prisma } from "@prisma/client";
import { buildCollegeWhereClause, buildPaginationMeta } from "./query.utils";

export class CollegeService {
  /**
   * Fetches colleges with filtering, sorting, and pagination.
   * Optimizes complex sorting (rating, fees) using separate aggregations to handle Prisma limitations.
   */
  static async getColleges(params: CollegeQueryParams) {
    const { sortBy, sortOrder, page, limit, minRating } = params;
    const skip = (page - 1) * limit;

    // 1. Build initial where clause using reusable utility
    const where = buildCollegeWhereClause(params);
    const andArray = where.AND as Prisma.CollegeWhereInput[];

    // 2. Handle minRating filter (requires aggregation)
    if (minRating) {
      const collegeIdsWithMinRating = await prisma.review.groupBy({
        by: ["collegeId"],
        _avg: { rating: true },
        having: {
          rating: {
            _avg: { gte: minRating },
          },
        },
      });

      const validCollegeIds = collegeIdsWithMinRating.map((r) => r.collegeId);
      andArray.push({ id: { in: validCollegeIds } });
    }

    // 3. Handle complex sorting (Rating/Fees)
    // Prisma doesn't support sorting by aggregated values in findMany directly for SQLite/Postgres sometimes
    // or it requires complex nested queries. We use a two-step approach for aggregation-based sorts.
    let sortedIds: string[] | null = null;

    if (sortBy === "rating") {
      const result = await prisma.review.groupBy({
        by: ["collegeId"],
        _avg: { rating: true },
        where: { college: where },
        orderBy: { _avg: { rating: sortOrder } },
        skip,
        take: limit,
      });
      sortedIds = result.map((r) => r.collegeId);
    } else if (sortBy === "fees") {
      const result = await prisma.course.groupBy({
        by: ["collegeId"],
        _min: { fees: true },
        where: { college: where },
        orderBy: { _min: { fees: sortOrder } },
        skip,
        take: limit,
      });
      sortedIds = result.map((r) => r.collegeId);
    }

    // 4. Fetch main college data
    const [colleges, total] = await Promise.all([
      prisma.college.findMany({
        where: sortedIds ? { id: { in: sortedIds } } : where,
        orderBy: sortedIds 
          ? undefined 
          : { [sortBy === "fees" || sortBy === "rating" ? "ranking" : sortBy]: sortOrder },
        skip: sortedIds ? 0 : skip,
        take: limit,
        include: {
          _count: {
            select: {
              courses: true,
              reviews: true,
            },
          },
        },
      }),
      prisma.college.count({ where }),
    ]);

    // 5. Restore order if we used sortedIds (findMany with 'in' doesn't guarantee order)
    let finalColleges = colleges;
    if (sortedIds) {
      finalColleges = sortedIds
        .map((id) => colleges.find((c) => c.id === id))
        .filter((c): c is typeof colleges[0] => !!c);
    }

    // 6. Batch fetch average ratings (Optimization: avoids N+1 queries)
    const collegeIds = finalColleges.map((c) => c.id);
    const avgRatings = await prisma.review.groupBy({
      by: ["collegeId"],
      _avg: { rating: true },
      where: { collegeId: { in: collegeIds } },
    });

    const ratingMap = new Map(avgRatings.map((r) => [r.collegeId, r._avg.rating || 0]));

    const data = finalColleges.map((college) => ({
      ...college,
      averageRating: ratingMap.get(college.id) || 0,
    }));

    return {
      data,
      meta: buildPaginationMeta(total, page, limit),
    };
  }

  /**
   * Fast search for autocomplete/suggestions
   */
  static async searchColleges(query: string) {
    return prisma.college.findMany({
      where: {
        OR: [
          { name: { contains: query, mode: "insensitive" } },
          { city: { contains: query, mode: "insensitive" } },
        ],
      },
      select: {
        id: true,
        name: true,
        slug: true,
        city: true,
        state: true,
      },
      take: 10,
    });
  }
}
